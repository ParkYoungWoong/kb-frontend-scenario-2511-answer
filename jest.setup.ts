import '@testing-library/jest-dom'

// Request 폴리필
class MockRequest {
  url: string
  constructor(url: string | URL) {
    this.url = url.toString()
  }
}
// Response 폴리필
class MockResponse {
  static json(data: unknown) {
    return {
      json: async () => data
    }
  }
}

global.Request = MockRequest as unknown as typeof global.Request
global.Response = MockResponse as unknown as typeof global.Response
