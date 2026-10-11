export interface ContactSubmissionRequestDto {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResponseDto {
  success: boolean;
  message: string;
}
