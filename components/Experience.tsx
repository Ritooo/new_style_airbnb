'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { listings as mockListings, Listing } from '@/data/listings';
import { SearchBar, type SearchFilters } from '@/components/SearchBar';
import { Globe } from '@/components/Globe';
import { PropertyPanel } from '@/components/PropertyPanel';
import { DarkModeToggle } from '@/components/DarkModeToggle';

export function Experience() {
  const [filters, setFilters] = useState<SearchFilters>({ location: '', guests: 2, tags: [] });
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredListings = useMemo(() => {
    const lowerLocation = filters.location.trim().toLowerCase();
    return mockListings.filter((listing) => {
      const matchesLocation = lowerLocation
        ? listing.location.toLowerCase().includes(lowerLocation) ||
          listing.title.toLowerCase().includes(lowerLocation)
        : true;
      const matchesGuests = filters.guests ? listing.guests >= filters.guests : true;
      const matchesTags =
        !filters.tags.length || filters.tags.every((tag) => listing.tags.includes(tag));
      return matchesLocation && matchesGuests && matchesTags;
    });
  }, [filters]);

  const handleSearch = (nextFilters: SearchFilters) => {
    setFilters(nextFilters);
    setHasSearched(true);
    setSelectedListing(null);
  };

  const listingsToRender = hasSearched ? filteredListings : mockListings;

  return (
    <div className="flex min-h-screen flex-col gap-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-16 text-foreground">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-12">
        <div className="flex flex-col items-center justify-between gap-3 text-white sm:flex-row">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-lg font-semibold tracking-widest text-white/80"
          >
            GlobeBnB
          </motion.span>
          <DarkModeToggle />
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className="text-center text-4xl font-semibold tracking-tight text-white sm:text-left sm:text-5xl"
        >
          Orbit the world. Drop into stays that feel unreal.
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center text-base text-slate-300 sm:mx-0 sm:text-left"
        >
          Enter a cinematic atlas of handcrafted stays. Filter by vibe, rotate through continents,
          and land softly on a home that matches your imagination.
        </motion.p>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col gap-6 lg:flex-row">
          <Globe
            listings={listingsToRender}
            selectedListing={selectedListing ?? undefined}
            onSelect={(listing) => {
              setSelectedListing(listing);
              setHasSearched(true);
            }}
          />
          <div className="lg:w-[360px]">
            <PropertyPanel
              listing={selectedListing}
              open={Boolean(selectedListing)}
              onClose={() => setSelectedListing(null)}
            />
            {!selectedListing && (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                {listingsToRender.length ? (
                  <p>
                    Tap any glowing marker to swoop into immersive details for that stay. Filters
                    update pins instantly.
                  </p>
                ) : (
                  <p>
                    No stays match those filters yet. Try widening your search or clearing a
                    couple of tags.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 text-sm text-slate-200 md:grid-cols-3"
        >
          <div>
            <h3 className="text-base font-semibold text-white">Live filters</h3>
            <p className="mt-1 text-slate-300">
              Every tweak pans the globe and refreshes pins in real time, keeping you in flow.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Cinematic travel</h3>
            <p className="mt-1 text-slate-300">
              Smooth easing inspired by Apple TV flyovers keeps navigation elegant.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Made for touch</h3>
            <p className="mt-1 text-slate-300">
              Responsive layouts adapt from immersive desktops to palm-sized explorers.
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
