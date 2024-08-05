import React from 'react';

interface Props {
  title: string;
  body: string;
  href: string;
}

const Card: React.FC<Props> = ({ title, body, href }) => {
  return (
    <li className="link-card">
      <a href={href}>
        <h2>
          {title}
          <span>&rarr;</span>
        </h2>
        <p>{body}</p>
      </a>
    </li>
  );
};

export default Card;
