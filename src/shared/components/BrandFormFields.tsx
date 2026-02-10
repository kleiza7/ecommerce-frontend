import { useFormState, type Control } from "react-hook-form";
import GenericFormInput from "./GenericFormInput";
import InputErrorLabel from "./InputErrorLabel";
import InputLabel from "./InputLabel";

export type BrandFormType = {
  name: string;
};

const BrandFormFields = ({
  control,
  disabled = false,
}: {
  control: Control<BrandFormType>;
  disabled?: boolean;
}) => {
  const { errors } = useFormState({ control });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-5 pb-4">
        <div className="relative flex flex-col">
          <InputLabel label="Name" hasAsterisk />

          <GenericFormInput
            field="name"
            control={control}
            required
            hasError={!!errors.name}
            disabled={disabled}
          />

          <InputErrorLabel message={errors.name?.message} />
        </div>
      </div>
    </div>
  );
};

export default BrandFormFields;
