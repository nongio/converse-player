import React, { useState, useEffect } from 'react';

import Header from './components/header';
import Timeline from './components/timeline';
import data from './examples/lost-phone.json';
import Player from './modules/player';
import './App.css';

function App() {
  const recipient = [...data.story.users]
    .filter(user => user.id !== data.story.main_user_id)
    .pop();
  const [entries, updateEntries] = useState([]);
  const [isBuffering, updateBufferState] = useState(false);
  const [inputText,updateInputText] = useState('');
  const [timestamp, updateTimestamp] = useState(Date.now());
  const [status,updateStatus] = useState('last seen yesterday');

  useEffect(() => {
    const player = new Player(data.story.main_user_id, data.story.timeline);

    player.on('send', message => {
      updateInputText(prevInputText => {
        return '';
      });
      updateTimestamp(message.timestamp); 
      updateEntries(prevEntries => {
        return [...prevEntries, {
          message: message.content.data,
          align: 'right'
        }];
      }); 
    });

    player.on('receive', message => {
      updateBufferState(false);
      updateTimestamp(message.timestamp);
      updateEntries(prevEntries => {
        return [...prevEntries, {
          message: message.content.data,
          align: 'left'
        }];
      }); 
    });

    player.on('text-input', character => {
      updateInputText(prevInputText => {
        return prevInputText + character;
      }); 
    });

    player.on('context-changed', context => {
      updateTimestamp(context.timestamp);
      updateEntries(prevEntries => {
        return [...prevEntries, context];
      });
    });

    player.on('incoming', () => {
      updateBufferState(true);
      updateStatus('online');
    });

    player.play();
  },[]);

  return (
    <div className="App">
      <Header
        user={recipient}
        timestamp={timestamp}
        status={status}
          />
      <Timeline
        entries={entries}
        isBuffering={isBuffering}
        inputText={inputText} />
    </div>
  );
}

export default App;
