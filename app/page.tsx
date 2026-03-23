import { Header } from './components/Header';
import { HeaderTab } from './components/HeaderTab';
import { Sidebar } from './components/Sidebar';
import { Calendar } from './components/Calendar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <HeaderTab />
        <main className="flex w-full h-full bg-gray-300">
          <Calendar />
        </main>
      </div>
    </div>
  );
}
