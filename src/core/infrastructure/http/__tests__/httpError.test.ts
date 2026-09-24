import { HttpError } from '../httpError'

describe('HttpError', () => {
  it('is an instance of Error', () => {
    const error = new HttpError(500, 'Server error')

    expect(error).toBeInstanceOf(Error)
  })

  it('is named HttpError', () => {
    const error = new HttpError(500, 'Server error')

    expect(error.name).toBe('HttpError')
  })

  it('stores the given message', () => {
    const error = new HttpError(500, 'Server error')

    expect(error.message).toBe('Server error')
  })

  it('stores the status code', () => {
    const error = new HttpError(503, 'Unavailable')

    expect(error.status).toBe(503)
  })

  it('stores the response body', () => {
    const body = { error: 'Bad Request', message: 'Invalid id' }
    const error = new HttpError(400, 'Invalid id', body)

    expect(error.body).toEqual(body)
  })

  it('is unauthorized when the status is 401', () => {
    const error = new HttpError(401, 'Unauthorized')

    expect(error.isUnauthorized).toBe(true)
  })

  it('is not unauthorized when the status is not 401', () => {
    const error = new HttpError(403, 'Forbidden')

    expect(error.isUnauthorized).toBe(false)
  })

  it('is not found when the status is 404', () => {
    const error = new HttpError(404, 'Not found')

    expect(error.isNotFound).toBe(true)
  })

  it('is not "not found" when the status is not 404', () => {
    const error = new HttpError(500, 'Server error')

    expect(error.isNotFound).toBe(false)
  })
})
