import React, { useState } from 'react';

import Header from './components/header';
import Timeline from './components/timeline';
import data from './examples/lost-phone.json';
import './App.css';

function App() {

    const [index, setIndex] = useState(1);

    const timeline = data.story.timeline.slice(0, index);
    const users = data.story.users;
    const main_user_id = data.story.main_user_id;

    return (
        <div className="App">
            <Header
                users={users}
                mainUserId={main_user_id}
                entries={timeline}
            />
            <Timeline
                entries={timeline}
                users={users}
                mainUserId={main_user_id}
                update={() => setIndex(index+1)}
                nextMessage={data.story.timeline[index]}
            />
        </div>
    );
}

export default App;
