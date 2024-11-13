export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
  scheduled_date: Date | string;
}
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => Promise<void>;
  updateEntry: (id: string, entryData: Entry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
};
