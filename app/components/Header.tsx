import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-300 flex-row p-2 ">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-semibold text-gray-400">管理CMS</h1>
      </div>
      <p className="text-md text-gray-500">admin:Aテスト本社</p>
      <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-500"
                  />
      <p className="text-md text-gray-500">テスト管理者 ユーザー</p>
    </header>
  );
}