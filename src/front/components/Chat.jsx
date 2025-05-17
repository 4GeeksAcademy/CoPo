
import { Chat } from 'react-together';

    export default function Chatdemo ({title,id}) {
  return (
    <div className="fixed bottom-0 right-2">
      <Chat 
      chatName={title}
      rtKey={id}
      components="ChatHeader"
       />
       {/* can use this to make a 2nd chat box lines 7-10 */}
    </div>
  );
}
