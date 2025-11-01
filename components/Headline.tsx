import { oswald } from '@/styles/fonts'

export default function Headline() {
  return (
    <section
      data-testid="headline"
      className="mb-10">
      <h1
        className={`${oswald.className} mb-10 text-[80px] leading-none max-sm:text-[60px]`}>
        <span className="text-[var(--color-primary)]">OMDb API</span>
        <br />
        THE OPEN
        <br />
        MOVIE DATABASE
      </h1>
      <p className="text-[var(--color-white-30)]">
        The OMDb API is a RESTful web service to obtain movie information, all
        content and images on the site are contributed and maintained by our
        users. If you find this service useful, please consider making a
        one-time donation or become a patron.
      </p>
    </section>
  )
}
