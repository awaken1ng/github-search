import * as React from 'react';
import { StarRate, Visibility, Share } from '@material-ui/icons';
import './RepositoryCard.sass';

interface Props {
  author: string;
  name: string;
  description: string;
  url: string;
  watchers: number;
  stars: number;
  forks: number;
}

export default function RepositoryCard({
  author, name, description, url, stars, watchers, forks,
}: Props) {
  return (
    <a className="repoCard-link" href={url} target="_blank" rel="noopener noreferrer">
      <div className="repoCard">
        <div className="repoCard-info">
          <div className="repoCard-fullname">
            <span className="repoCard-author">{author}</span>
            <span className="repoCard-divider">/</span>
            <span className="repoCard-name">{name}</span>
          </div>
          <div className="repoCard-stats">
            <span className="repoCard-stat"><Visibility />{watchers}</span>
            <span className="repoCard-stat"><StarRate />{stars}</span>
            <span className="repoCard-stat"><Share />{forks}</span>
          </div>
        </div>
        <div className="repoCard-desc">{description}</div>
      </div>
    </a>
  );
}
