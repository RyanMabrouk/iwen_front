import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { moroccanStates } from "@/helpers/data/data";
import { IValidationErrors } from "@/types";
import FormInput from "../../(profile)/profile/ui/formInput";
import FormSelect from "../../(profile)/profile/ui/formSelect";

interface ShippingFormProps {
  user: any;
  errors: IValidationErrors<any> | null | undefined;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export default function ShippingForm({
  user,
  errors,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}: ShippingFormProps) {
  return (
    <>
      <div className="mb-6 text-lg font-semibold">الشحن</div>
      <div className="grid w-full grid-cols-2 gap-6 max-sm:grid-cols-1 md:grid-cols-2">
        <FormInput
          errors={errors?.name}
          label="الإسم"
          name="first_name"
          placeholder="الإسم"
          defaultValue={user?.data?.first_name}
          required
          icon={<User className="h-4 w-4" />}
        />
        <FormInput
          errors={errors?.email}
          label="البريد الإلكتروني"
          name="email"
          type="email"
          placeholder="sedki_tilja@gmail.com"
          defaultValue={user?.data?.email}
          required
          disabled
          icon={<Mail className="h-4 w-4" />}
        />
        <FormSelect
          label="الولاية"
          name="state"
          placeholder="اختر الولاية"
          options={moroccanStates.map((state) => state.state)}
          value={selectedState}
          required
          onChange={(value) => {
            if (value) {
              setSelectedState(value);
            }
          }}
        />
        <FormSelect
          errors={errors?.city}
          label="المدينة"
          name="city"
          placeholder="اختر المدينة"
          options={
            moroccanStates.find((state) => state.state === selectedState)
              ?.cities || []
          }
          value={selectedCity}
          required
          onChange={(value) => {
            if (value) setSelectedCity(value);
          }}
          disabled={!selectedState}
        />
        <FormInput
          errors={errors?.phone_number}
          label="رقم الهاتف"
          name="phone_number"
          type="tel"
          placeholder="004 47 18 74"
          defaultValue={user?.data?.phone_number}
          required
          icon={<Phone className="h-4 w-4" />}
        />
        <FormInput
          errors={errors?.postal_code}
          label="الرقم البريدي"
          name="postalCode"
          placeholder="10004"
          defaultValue={user?.data?.postal_code}
          required
          icon={<Building2 className="h-4 w-4" />}
        />
        <FormInput
          errors={errors?.address}
          label="عنوان السكن - 1"
          name="address1"
          placeholder="شارع المهدي بن سلامة"
          defaultValue={user?.data?.street}
          required
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>
    </>
  );
}
