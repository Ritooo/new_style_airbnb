'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { listings } from '@/data/listings';
import { Search } from 'lucide-react';

export type SearchFilters = {
  location: string;
  guests: number;
  tags: string[];
};

type SearchBarProps = {
  onSearch: (filters: SearchFilters) => void;
};

const allTags = Array.from(new Set(listings.flatMap((listing) => listing.tags)));

export function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagOptions = useMemo(() => allTags, []);

  return (
    <motion.form
      layout
      onSubmit={(event) => {
        event.preventDefault();
        onSearch({ location, guests, tags: selectedTags });
      }}
      className="flex w-full flex-col gap-4 rounded-2xl bg-card/80 p-6 shadow-lg backdrop-blur"
    >
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Search className="h-5 w-5" />
        Where to next?
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-sm font-medium text-muted-foreground">
          Location
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="City, region, or dream"
            className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-muted-foreground">
          Guests
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <div className="flex flex-col text-sm font-medium text-muted-foreground">
          Vibes
          <div className="mt-1 flex flex-wrap gap-2">
            {tagOptions.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTags((previous) =>
                      previous.includes(tag)
                        ? previous.filter((item) => item !== tag)
                        : [...previous, tag]
                    )
                  }
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    active
                      ? 'border-transparent bg-primary text-primary-foreground shadow'
                      : 'border-border bg-background/60 hover:border-primary/60'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="px-6">
          Explore stays
        </Button>
      </div>
    </motion.form>
  );
}
