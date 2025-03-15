import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../modal";
import Button from "../button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import useDashboardApi from "../../utils/api/dashboard.api";
import Input from "../input";
import Select from "../select";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateTaskModal({ isOpen, setIsOpen }: Props) {
  const { createTask } = useDashboardApi();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

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
      await createTask(formData);
      setIsOpen(false);
      setIsLoading(false);
      handleGenericSuccess("🎉 Task created successfully 🎉");

      setFormData({
        title: "",
        description: "",
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
          <h1 className="text-lg font-medium">Create New Task</h1>
          <p className="text-xs text-gray-400">
            Created task would be added to task collection
          </p>
        </div>
        <div className="mt-6 space-y-4 md:space-y-6">
          <Input
            name="title"
            value={formData.title}
            placeholder="Task title"
            label=""
            onChange={handleChange}
            variant="light"
          />
          <Input
            name="description"
            value={formData.description}
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
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
