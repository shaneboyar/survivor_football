import React from 'react';
import {
  Typography
} from '@material-ui/core';
import EntryAvatar from './EntryAvatar';


const Metadata = ({ league }) => {
  return (
    <div>
      { league.userEntries &&
        <div>
          <Typography variant="h3">Your Entries</Typography>
          {league.userEntries.map((entry) => <EntryAvatar key={entry.id} entry={entry} />)}
        </div>
      }
      { league.otherEntries &&
        <div>
          <Typography variant="h3">Everyone Else</Typography>
          {league.otherEntries.map((entry) => <EntryAvatar key={entry.id} entry={entry} />)}
        </div>
      }
    </div>
    
  );
};

export default Metadata;