import React from "react";

const Terms = () => {
  return (
    <section>
      {/* Section Container */}
      <div className="flex flex-col items-center justify-center px-5 md:px-10">
        {/* Title Container */}
        <div className="flex min-w-[100vw] flex-col items-start bg-[#f2f2f7] py-16 sm:py-20 lg:items-center">
          {/* Component */}
          <div className="grid max-w-5xl px-10 lg:grid-cols-2">
            <div className="flex flex-col items-start self-center py-5">
              <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                Terms of Service
              </h1>
              <p className="mb-8 max-w-md flex-col text-sm text-[#808080] sm:text-base">
                Read our terms below to learn more about your rights and
                responsibilities as a Flow user.
              </p>
            </div>
            <svg
              viewBox="0 0 499 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="498"
                height="420"
                transform="translate(0.5)"
                fill="#CCCCCC"
              />
            </svg>
          </div>
        </div>
        {/* Terms Container */}
        <div className="mx-auto w-full max-w-5xl py-12 md:py-16 lg:py-20">
          <p className="mb-5 text-base font-extrabold uppercase">
            Last updated as of October 17, 2022
          </p>
          <div className="mb-6 min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="text-sm font-bold uppercase sm:text-base">Services</p>
            <p className="text-sm sm:text-base">
              Flowspark offers a range of design services, including but not
              limited to graphic design, web design, branding, and
              illustration.The Company will provide the agreed-upon services
              with professionalism and expertise, following industry standards
              and best practices. The specific details, deliverables, timelines,
              and pricing for each project will be
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">
              Client Responsibilities
            </p>
            <p className="text-sm sm:text-base">
              The client agrees to provide accurate and timely information,
              materials, and feedback necessary for the successful completion of
              the project. The client is responsible for obtaining any necessary
              permissions, licenses, or copyrights for materials provided to the
              Company for use in the project. The client acknowledges that
              delays or failures in providing required materials or feedback may
              impact project timelines and deliverables.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">
              Intellectual Property
            </p>
            <p className="text-sm sm:text-base">
              Any intellectual property rights, including but not limited to
              copyrights and trademarks, in the final deliverables created by
              the Company shall be transferred to the client upon receipt of
              full payment, unless otherwise agreed upon in writing. The client
              warrants that any materials provided to the Company for use in the
              project do not infringe upon the intellectual property rights of
              any third party.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">Payment</p>
            <p className="text-sm sm:text-base">
              The client agrees to pay the Company the agreed-upon fees for the
              services rendered. Payment terms, including the amount, method,
              and schedule, will be specified in the separate agreement or
              proposal. The Company reserves the right to suspend or terminate
              services in the event of non-payment or late payment.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">Confidentiality</p>
            <p className="text-sm sm:text-base">
              The Company and the client agree to keep confidential any
              proprietary or sensitive information disclosed during the course
              of the project. Both parties shall take reasonable measures to
              protect such information from unauthorized access or disclosure.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">
              Limitation of Liability
            </p>
            <p className="text-sm sm:text-base">
              The Company shall not be liable for any direct, indirect,
              incidental, or consequential damages arising out of the use or
              inability to use the services provided. The client acknowledges
              that the Company&apos;s liability is limited to the amount paid
              for the services rendered.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">Termination</p>
            <p className="text-sm sm:text-base">
              Either party may terminate this Agreement with written notice if
              the other party breaches any material provision and fails to
              remedy the breach within a reasonable time. In the event of
              termination, the client shall pay the Company for the services
              provided up to the termination date.
            </p>
          </div>
          {/* Term */}
          <div className="mb-6 flex flex-col items-start gap-y-3">
            <p className="font-bold uppercase sm:text-base">Governing Law</p>
            <p className="text-sm sm:text-base">
              This Agreement shall be governed by and construed in accordance
              with the laws of [Your Jurisdiction]. Any disputes arising out of
              this Agreement shall be subject to the exclusive jurisdiction of
              the courts of [Your Jurisdiction].
            </p>
          </div>
          {/* Term */}
          <div className="mb-10 mt-10 min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
          <p className="mb-6 text-sm sm:text-base">
            By accessing, browsing, or utilizing any design services,
            communication channels, or materials provided by Flowspark,
            including but not limited to graphic design, web design, branding,
            illustration, and user interface design, whether through our
            website, email, phone, or any other means, you expressly
            acknowledge, understand, and agree that you have carefully read,
            comprehended, and fully consent to be legally.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
