'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Listing } from '@/data/listings';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft } from 'lucide-react';

export type PropertyPanelProps = {
  listing?: Listing | null;
  open: boolean;
  onClose: () => void;
};

export function PropertyPanel({ listing, open, onClose }: PropertyPanelProps) {
  return (
    <AnimatePresence>
      {open && listing ? (
        <motion.aside
          key={listing.id}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative flex h-full w-full max-w-md flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/90 backdrop-blur-lg shadow-2xl"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="absolute left-4 top-4 z-10 border border-white/20 bg-white/20 text-white backdrop-blur"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to globe
            </Button>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <div>
              <h2 className="text-2xl font-semibold">{listing.title}</h2>
              <p className="text-muted-foreground">{listing.location}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground/90">
              {listing.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-2xl font-semibold">
                  ${listing.pricePerNight}
                  <span className="text-base font-normal text-muted-foreground"> / night</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {listing.rating.toFixed(2)}
              </div>
            </div>
            <Button className="w-full">Reserve</Button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
