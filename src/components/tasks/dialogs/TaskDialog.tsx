import DialogWrapper from '../../dialogs/DialogWrapper';
import TaskForm from '../forms/TaskForm';

const TaskDialog = () => {
  return (
    <DialogWrapper
      title="Task Details"
      Component={TaskForm}
      path="/tasks/:id"
      returnTo="/tasks"
    />
  );
};

export default TaskDialog;
