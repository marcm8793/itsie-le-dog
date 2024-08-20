export type UwConfig = {
  cloudName: string;
  uploadPreset: string;
};

export type UploadedFile = {
  url: string;
  fileType: "image" | "video";
};

export type UploadWidgetProps = {
  uwConfig: UwConfig;
  setPublicId: (id: string) => void;
  onUpload: (url: string) => void;
};

export type Photo = {
  id: string;
  url: string;
};
