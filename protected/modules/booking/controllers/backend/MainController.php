<?php

class MainController extends ModuleAdminController {
	public $modelName = 'Booking';
	public $defaultAction='admin';

	public function actionAdmin(){
		parent::actionAdmin();
	}

	public function actionDelete($id){
		if(Yii::app()->request->isPostRequest){
			$model = $this->loadModel($id);
			if($model->status == Booking::STATUS_NEW || $model->status == Booking::STATUS_WAITPAYMENT){
				$model->status = Booking::STATUS_DECLINED;
				$model->save(false);
				
				$notifier = new Notifier;
				$notifier->setLang();
				$statuses = $model->getStatuses();
				$model->tostatus = $statuses[$model->status];
				$notifier->restoreLang();

				$notifier->raiseEvent('onBookingStatusChanged', $model, $model->user_id);

			}
			
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else {
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
		}
	}

	public function actionView($id){
		$model = $this->loadModelWith(array('user', 'time_in_value', 'time_out_value'));
		
		if(isset($_POST['Booking']) && $model->status == Booking::STATUS_NEW){
			$model->scenario = 'view';
			$model->attributes=$_POST['Booking'];
			if($model->validate()){
				$model->status = Booking::STATUS_WAITPAYMENT;
				$model->save(false);

				$notifier = new Notifier;
				$notifier->setLang();
				$statuses = $model->getStatuses();
				$model->tostatus = $statuses[$model->status];
				$notifier->restoreLang();

				$notifier->raiseEvent('onBookingStatusChanged', $model, $model->user_id);
				
				Yii::app()->user->setFlash('success', tt('Booking approve succefully completed.'));
			}
		}

		$this->render('view',array(
			'model'=>$model,
		));
	}
	
}
