export interface Link {
  /**
   * The link key, this is the same as what is appened at the end of the URL.
   */
  key: string
  /**
   * The email representing the user who owns this link.
   */
  email: string
  /**
   * The destination URL.
   */
  destination: string
}
