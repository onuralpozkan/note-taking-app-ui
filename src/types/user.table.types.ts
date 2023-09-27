export interface Data {
  role: string;
  project: string;
  username: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  selected?: boolean;
}

export type selectedRow = keyof Data;
export type UsersRowType = Data[];