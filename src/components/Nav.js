import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { faMusic } from '@fortawesome/pro-light-svg-icons';

const Nav = ({setLibraryStatus, libraryStatus}) => {

  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library 
        <FontAwesomeIcon icon={faMusic} className="button-icon"  />
      </button>
    </nav>
  )
}

export default Nav;