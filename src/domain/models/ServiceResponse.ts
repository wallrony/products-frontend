interface ServiceResponse<T = Record<string, unknown>> {
  data?: T;
  error?: string;
}

export default ServiceResponse;
