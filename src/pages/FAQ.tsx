import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{marginLeft:"350px",marginTop:"90px",borderWidth:"2px",borderColor:"orange",borderRadius:"10px"}}>
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800 dark:text-neutral-200">
          Frequently Asked Questions
        </h2>
      </div>
      {/* End Title */}

      <div className="max-w-5xl mx-auto">
        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Can I cancel at anytime?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.
            </p>
          </div>
          {/* End Col */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              My team has credits. How do we use them?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
            </p>
          </div>
          {/* End Col */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              How does Companionn's pricing work?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
            </p>
          </div>
          {/* End Col */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              How secure is Companionn?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              Protecting the data you trust to Companionn is our first priority. This part is really crucial in keeping the project in line to completion.
            </p>
          </div>
          {/* End Col */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Do you offer discounts?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              We've built in discounts at each tier for teams. The time has come to bring those ideas and plans to life.
            </p>
          </div>
          {/* End Col */}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              What is your refund policy?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              We offer refunds. We aim high at being focused on building relationships with our clients and community.
            </p>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default FAQ;
