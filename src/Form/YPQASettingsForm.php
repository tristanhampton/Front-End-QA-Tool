<?php

namespace Drupal\yp_qa\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Handles the settings form for the YP QA Module
 */
class YPQASettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'yp_qa_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['yp_qa.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('yp_qa.settings');

    $form['enable_qa'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable QA'),
      '#default_value' => $config->get('enable_qa'),
      '#description' => $this->t('Toggles the QA widget. Currently, a cache refresh is required after toggling this.'),
    ];
    
    return parent::buildForm($form, $form_state);
  }
  
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('yp_qa.settings');
    $config->set('enable_qa', $form_state->getValue('enable_qa'))->save();

    parent::submitForm($form, $form_state);
  }
  
}
