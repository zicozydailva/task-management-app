import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import KeyValueComponent from "../key-value-component";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userDetails: Record<string, any>;
}

export default function UserDetailsModal({
  isOpen,
  setIsOpen,
  userDetails,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1 className="text-lg font-semibold">User Details</h1>
        <div className="max-h-[680px] divide-y divide-gray-200 overflow-y-scroll py-3 md:py-6">
          <KeyValueComponent
            name="Membership Type"
            value={userDetails?.membershipType}
            size="sm"
          />
          <KeyValueComponent
            name="Account Type"
            value={userDetails?.accountType}
            size="sm"
          />
          <KeyValueComponent
            name="Business Name"
            value={userDetails?.businessName}
            size="sm"
          />
          <KeyValueComponent
            name="Trading Name"
            value={userDetails?.tradingName}
            size="sm"
          />
          <KeyValueComponent
            name="Onboard Type"
            value={userDetails?.onboardType}
            size="sm"
          />
          <KeyValueComponent
            name="How Did You Find Us"
            value={userDetails?.howDidYouFindUs}
            size="sm"
          />
          <KeyValueComponent
            name="Address"
            value={userDetails?.address}
            size="sm"
          />

          <KeyValueComponent
            name="Job Title"
            value={userDetails?.jobTitle}
            size="sm"
          />
          <KeyValueComponent
            name="Business Use Case"
            value={userDetails?.businessUseCase}
            size="sm"
          />
          <KeyValueComponent
            name="Monthly Volume"
            value={userDetails?.monthlyVolume}
            size="sm"
          />
        </div>
      </div>
    </Modal>
  );
}
