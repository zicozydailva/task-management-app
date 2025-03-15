import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import useDashboardApi from "../../utils/api/dashboard.api";
import Input from "../input";
import Select from "../select";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: any;
}

export default function UpdateTaskModal({
  isOpen,
  setIsOpen,
  selectedItem,
}: Props) {
  const { updateTaskStatus } = useDashboardApi();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
  });

  useEffect(() => {
    setFormData({ status: selectedItem?.status });
  }, [selectedItem?.status]);

  const statuses = [
    { name: "Pending 📌", value: "pending" },
    { name: "In-progress 📝", value: "in-progress" },
    { name: "Completed ✅", value: "completed" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (option: any) => {
    const { value } = option;
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async () => {
    try {
      await updateTaskStatus(selectedItem._id, { status: formData.status });
      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task updated successfully 🎉");

      setFormData({
        status: "",
      });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="text-lg font-medium">Update Task Status</h1>
        </div>
        <div className="mt-6 space-y-4 md:space-y-6">
          <Input
            name="title"
            value={selectedItem?.title}
            placeholder="Task title"
            label=""
            onChange={handleChange}
            variant="light"
          />
          <Input
            name="description"
            value={selectedItem?.description}
            placeholder="Task description"
            label=""
            onChange={handleChange}
            variant="light"
          />
          <Select
            name="status"
            label="Status"
            value={formData.status}
            options={statuses}
            onChange={handleSelect}
            variant="light"
          />
        </div>
        <div className="my-5">
          <Button loading={isLoading} rounded={false} className="w-full">
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
