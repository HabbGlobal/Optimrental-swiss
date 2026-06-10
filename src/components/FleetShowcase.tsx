"use client";

import { useState } from "react";
import { Vehicle } from "@/types";
import {
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Calendar,
  Users,
  Snowflake,
  Baby,
  Ruler,
  ArrowUpRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FleetShowcaseProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

function VehicleDetailCard({
  vehicle,
  onSelect,
}: {
  vehicle: Vehicle;
  onSelect?: (v: Vehicle) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : [vehicle.image_url || ""];

  const next = () => setCurrentImage((p) => (p + 1) % images.length);
  const prev = () =>
    setCurrentImage((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl">
      {/* ── Image Gallery ── */}
      <div className="relative h-80 bg-slate-200 overflow-hidden group">
        {images[0] ? (
          <>
            <img
              src={images[currentImage]}
              alt={vehicle.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />
            {/* Nav arrows */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="p-3 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="p-3 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-all"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    idx === currentImage ? "w-8 bg-amber-500" : "w-2 bg-white/60"
                  )}
                />
              ))}
            </div>
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity overflow-x-auto scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={cn(
                      "shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all",
                      idx === currentImage
                        ? "border-amber-500 scale-105"
                        : "border-white/30 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-20 h-20 text-slate-300" />
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-5 right-5">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg">
            <span className="text-slate-900 font-black text-xl">
              {vehicle.price_per_hour}{" "}
              <span className="text-[10px] uppercase text-slate-400 tracking-widest">
                CHF/day
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-8 space-y-6">
        {/* Title & subtitle */}
        <div>
          <h3 className="text-2xl font-black text-slate-900">{vehicle.name}</h3>
          {(vehicle.manufacturer || vehicle.model) && (
            <p className="text-amber-600 font-bold mt-0.5">
              {vehicle.manufacturer} {vehicle.model}
              {vehicle.year && ` (${vehicle.year})`}
            </p>
          )}
          <p className="text-slate-500 mt-3 leading-relaxed text-sm">
            {vehicle.description}
          </p>
        </div>

        {/* Feature tags */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest"
              >
                <Check size={10} className="text-amber-500" /> {tag}
              </div>
            ))}
          </div>
        )}

        {/* Specs grid */}
        {(vehicle.seat_count ||
          vehicle.transmission ||
          vehicle.fuel_type ||
          vehicle.year ||
          vehicle.euro_class) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {vehicle.seat_count && (
              <SpecTile icon={<Users size={16} />} label="Seats" value={String(vehicle.seat_count)} />
            )}
            {vehicle.transmission && (
              <SpecTile icon={<Gauge size={16} />} label="Transmission" value={vehicle.transmission} />
            )}
            {vehicle.fuel_type && (
              <SpecTile icon={<Fuel size={16} />} label="Fuel Type" value={vehicle.fuel_type} />
            )}
            {vehicle.year && (
              <SpecTile icon={<Calendar size={16} />} label="Year" value={String(vehicle.year)} />
            )}
            {vehicle.euro_class && (
              <SpecTile icon={<Check size={16} />} label="Emission" value={vehicle.euro_class} />
            )}
          </div>
        )}

        {/* Dimensions */}
        {(vehicle.length ||
          vehicle.width ||
          vehicle.height ||
          vehicle.curb_weight ||
          vehicle.max_gross_weight) && (
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3 flex items-center gap-2">
              <Ruler size={13} /> Dimensions &amp; Weight
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {vehicle.length && <DimTile label="Length" value={`${vehicle.length} cm`} />}
              {vehicle.width && <DimTile label="Width" value={`${vehicle.width} cm`} />}
              {vehicle.height && <DimTile label="Height" value={`${vehicle.height} cm`} />}
              {vehicle.curb_weight && <DimTile label="Curb Weight" value={`${vehicle.curb_weight} kg`} />}
              {vehicle.max_gross_weight && <DimTile label="Max Weight" value={`${vehicle.max_gross_weight} kg`} />}
            </div>
          </div>
        )}

        {/* Winter & Safety */}
        {(vehicle.winter_ready ||
          vehicle.winter_tires ||
          vehicle.studded_tires ||
          vehicle.child_seat_space) && (
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3 flex items-center gap-2">
              <Snowflake size={13} /> Winter &amp; Safety
            </h4>
            <div className="flex flex-wrap gap-2">
              {vehicle.winter_ready && (
                <Badge icon={<Snowflake size={13} />} label="Winter Ready" color="blue" />
              )}
              {vehicle.winter_tires && (
                <Badge icon={<Check size={13} />} label="Winter Tires" color="blue" />
              )}
              {vehicle.studded_tires && (
                <Badge icon={<Check size={13} />} label="Studded Tires" color="blue" />
              )}
              {vehicle.child_seat_space && (
                <Badge icon={<Baby size={13} />} label="Child Seat Space" color="green" />
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        {onSelect && (
          <button
            onClick={() => onSelect(vehicle)}
            className="group w-full h-14 bg-slate-900 hover:bg-amber-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          >
            Select This Vehicle
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={28} />
          </button>
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImage]}
              alt={vehicle.name}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-all"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-all"
                >
                  <ChevronRight size={26} />
                </button>
                <div className="mt-4 flex gap-2 justify-center overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={cn(
                        "shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all",
                        idx === currentImage
                          ? "border-amber-500"
                          : "border-white/20 opacity-50 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
            <p className="text-center text-white/60 text-sm mt-3">
              {currentImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Helper sub-components ── */
function SpecTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 p-4 rounded-2xl">
      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-base font-black text-slate-900">{value}</p>
    </div>
  );
}

function DimTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-2xl text-center">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-base font-black text-slate-900">{value}</p>
    </div>
  );
}

function Badge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: "blue" | "green";
}) {
  const styles =
    color === "blue"
      ? "bg-blue-50 text-blue-700"
      : "bg-green-50 text-green-700";
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold",
        styles
      )}
    >
      {icon} {label}
    </div>
  );
}

/* ── Main export ── */
export default function FleetShowcase({
  vehicles,
  onSelectVehicle,
}: FleetShowcaseProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="mt-20 space-y-10">
      {/* Section header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          <Car size={12} /> Complete Fleet
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-slate-900">
          Our <span className="text-amber-500">Vehicles</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm font-medium">
          Explore full specifications, photos, and features for every vehicle in
          our fleet. Click &ldquo;Select This Vehicle&rdquo; to jump back and complete your
          booking.
        </p>
        <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Vehicle cards */}
      <div className="space-y-12">
        {vehicles.map((v) => (
          <VehicleDetailCard key={v.id} vehicle={v} onSelect={onSelectVehicle} />
        ))}
      </div>
    </section>
  );
}
