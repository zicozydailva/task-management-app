import { Dispatch, SetStateAction } from "react";
import Modal from "./modal";
import Button from "./button";
import { MdWarning } from "react-icons/md";
import { handleError, handleGenericSuccess } from "../utils/notify";
import useDashboardApi from "../utils/api/dashboard.api";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: any;
}

export default function DeleteConfirmationModal({
  isOpen,
  setIsOpen,
  selectedItem,
}: Props) {
  const { deleteTask } = useDashboardApi();

  const handleDelete = async () => {
    try {
      await deleteTask(selectedItem._id);
      handleGenericSuccess("Task deleted successfully");
      setIsOpen(false);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Modal
      showClose={false}
      className="bg-gray-100"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <section className="flex flex-col items-center justify-center">
        <aside className="my-8">
          <div className="mb-3  flex items-center justify-center rounded-full">
            <MdWarning className="text-4xl text-red-500" />
          </div>
          <p className="my-3">Are you sure you want to delete this task?</p>
        </aside>
        <div className="flex justify-between gap-3">
          <Button
            onClick={() => setIsOpen(false)}
            variant="primary_outlined"
            rounded={false}
          >
            No
          </Button>
          <Button onClick={() => handleDelete()} rounded={false}>
            Yes
          </Button>
        </div>
      </section>
    </Modal>
  );
}
