import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Dispatch, SetStateAction } from "react";
import { VscClose } from "react-icons/vsc";
import { cn } from "../lib/utils";

export type ModalSize = "md" | "sm" | "lg" | "xl" | "screen";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  size?: ModalSize;
  children: JSX.Element;
  showClose?: boolean;
  className?: string;
}

const Modal = ({
  isOpen,
  setIsOpen,
  size = "md",
  children,
  showClose = true,
  className = "bg-white",
}: Props) => {
  const sizes = {
    sm: "sm:max-w-md",
    md: "sm:max-w-[30rem]",
    lg: "sm:max-w-xl",
    xl: "sm:max-w-[60%]",
    screen: "h-screen w-screen",
  }[size];

  const close = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-500/20 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel
                className={cn(
                  "relative w-full max-w-md rounded-xl   p-6",
                  sizes,
                  className
                )}
              >
                {children}
                <div className="absolute right-6 top-6 cursor-pointer">
                  {showClose && <VscClose size={24} onClick={close} />}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
