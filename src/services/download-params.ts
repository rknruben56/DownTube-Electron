export interface DownloadParams {
  url: string;
  directory: string;
  title: string;
  onError: (output: string) => void;
  onComplete: () => void;
}