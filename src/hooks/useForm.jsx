import { useState } from 'react';
import _ from 'lodash';
import log from 'ololog';

const useForm = (callback, initialValues, formProps) => {
  const [values, setValues] = useState(initialValues);

  const handleClearForm = (e) => {
    e.persist();
    const _init_values = {};
    _.each(formProps, (obj, _key) => {
      _init_values[_key] = {
        value: '',
      };
      if (_key === 'mobile_phone') {
        _init_values[_key].use_work = false;
        _init_values[_key].use_home = false;
        _init_values[_key].use_mobile = true;
        _init_values[_key].use_fax = false;
        _init_values[_key].use_pager = false;
        _init_values[_key].use_other = false;
      }
      if (_key === 'home_phone') {
        _init_values[_key].use_work = false;
        _init_values[_key].use_home = true;
        _init_values[_key].use_mobile = false;
        _init_values[_key].use_fax = false;
        _init_values[_key].use_pager = false;
        _init_values[_key].use_other = false;
      }
      if (_key === 'work_phone' || _key === 'phone_number') {
        _init_values[_key].use_work = true;
        _init_values[_key].use_home = false;
        _init_values[_key].use_mobile = false;
        _init_values[_key].use_fax = false;
        _init_values[_key].use_pager = false;
        _init_values[_key].use_other = false;
      }
      if (_key === 'fax_number') {
        _init_values[_key].use_work = false;
        _init_values[_key].use_home = false;
        _init_values[_key].use_mobile = false;
        _init_values[_key].use_fax = true;
        _init_values[_key].use_pager = false;
        _init_values[_key].use_other = false;
      }
      if (_key === 'pager_number') {
        _init_values[_key].use_work = false;
        _init_values[_key].use_home = false;
        _init_values[_key].use_mobile = false;
        _init_values[_key].use_fax = false;
        _init_values[_key].use_pager = true;
        _init_values[_key].use_other = false;
      }
      if (_key === 'other_number') {
        _init_values[_key].use_work = false;
        _init_values[_key].use_home = false;
        _init_values[_key].use_mobile = false;
        _init_values[_key].use_fax = false;
        _init_values[_key].use_pager = false;
        _init_values[_key].use_other = true;
      }
    });
    setValues(() => ({ ..._init_values }));
    return 'clear_form';
  };

  const handleCancel = (e) => {
    e.persist();
    handleClearForm(e);
    return 'cancel_form';
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    callback();
  };

  const handleChange = (e) => {
    e.persist();
    let obj = { ...values };
    obj[e.target.name].value = e.target.value;
    setValues(() => ({ ...obj }));
  };

  const handleUpdate = async (_e, action) => {
    log.green('_e', _e);
    log.cyan('action', action);
    let obj = { ...values };
    obj[_e.target.name].value = _e.target.value;
    setValues(() => ({ ...obj }));
    return values
  };

  const handleCheckbox = ({ name, parent_prop, e }) => {
    e.persist();
    let obj = { ...values };
    obj[parent_prop][name] = e.target.checked;
    setValues(() => ({ ...obj }));
  };

  const handlePhoneNumber = (e) => {
    e.persist();
    let obj = { ...values };
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    obj[e.target.name].value = e.target.value;
    setValues(() => ({ ...obj }));
  };

  return {
    handlePhoneNumber,
    handleCheckbox,
    handleChange,
    handleUpdate,
    handleSubmit,
    handleClearForm,
    handleCancel,
    values,
  };
};

export default useForm;
