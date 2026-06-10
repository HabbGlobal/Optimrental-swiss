"use client";

import { useState, useRef } from "react";
import { Vehicle } from "@/types";
import BookingForm from "@/components/BookingForm";
import FleetShowcase from "@/components/FleetShowcase";

export default function BookPageClient({
  vehicles,
  locale,
}: {
  vehicles: Vehicle[];
  locale: string;
}) {
  const [preselectedVehicle, setPreselectedVehicle] = useState<Vehicle | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleSelectFromFleet = (vehicle: Vehicle) => {
    setPreselectedVehicle(vehicle);
    // Scroll up to the booking form
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <div ref={bookingRef} className="scroll-mt-28">
        <BookingForm
          vehicles={vehicles}
          locale={locale}
          preselectedVehicle={preselectedVehicle}
          onPreselectedConsumed={() => setPreselectedVehicle(null)}
        />
      </div>
      <FleetShowcase vehicles={vehicles} onSelectVehicle={handleSelectFromFleet} />
    </>
  );
}
