"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { categories2 } from "../navbar/Categories";
import Heading from "./Heading";

enum STEPS {
  CATEGORY = 0,
  CATEGORY2 = 1,
  LOCATION = 2,
  LOCATIONADD = 3,
  INFO = 4,
  IMAGES = 5,
  DESCRIPTION = 6,
  CONTACT = 7,
  PRICE = 8,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      bedroomCount: 1,
      size: 1,
      adress: "",
      cityName: "",
      phoneNumber: "",
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
      email: "",
      category2: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const category2 = watch("category2");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const bedroomCount = watch("bedroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Inzerát vytvorený");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Prosím vyplňte všetky polia");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Vytvorenie inzerátu";
    }

    return "Ďalej";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Vyberte si či chcete svoju nehnutelnosť predať alebo prenajať"
        subtitle="Vyberte si jednu z možností"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.CATEGORY2) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Vyberte si či je vaša nehnutelnosť apartmán alebo dom"
          subtitle="Vyberte si jednu z možností"
        />
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
        >
          {categories2.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category2) => setCustomValue("category2", category2)}
                selected={category2 === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="V akom štáte sa nachádza vaša nehnutelnosť"
          subtitle="Na mape si vyberte miesto"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.LOCATIONADD) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Zadajte mesto a adresu vašej nehnutelnosti"
          subtitle="pomôže to záujemcom nájsť vašu nehnutelnosť"
        />
        <Input
          id="cityName"
          label="Mesto"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="adress"
          label="Adresa"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Základné informácie o vašej nehnutelnosti"
          subtitle="Zadajte základné informácie o vašej nehnutelnosti"
        />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Miestnosti"
          subtitle="Koľko izieb máte?"
        />

        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Kúpeľne"
          subtitle="Koľko kúpeľní máte?"
        />

        <Counter
          onChange={(value) => setCustomValue("bedroomCount", value)}
          value={bedroomCount}
          title="Spálne"
          subtitle="Koľko spálni máte?"
        />

        <hr />
        <Input
          id="size"
          label="Velkosť nehnutelnosti"
          disabled={isLoading}
          type="number"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Pridajte fotku svojej nehnutelnosti"
          subtitle="Ukážte záujemcom ako vyzerá vaša nehnutelnosť"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Popíšte svoju nehnutelnosť"
          subtitle="Napíšte popis o vašej nehnutelnosti"
        />
        <Input
          id="title"
          label="Názov inzerátu"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Popis"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.CONTACT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Zadajte svoje kontaktné údaje"
          subtitle="Ako vás môźe uchádzač skontaktovať?"
        />
        <Input
          id="phoneNumber"
          label="Telefónne číslo"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Zadajte cenu"
          subtitle="Zadajte cenu za ktorú chcete prenajať alebo predať vašu nehnutelnosť"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Vytvorenie inzerátu"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
