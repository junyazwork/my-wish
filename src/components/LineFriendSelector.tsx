import { useState, useMemo } from "react";

interface Friend {
  id: string;
  name: string;
}

interface LineFriendSelectorProps {
  onBack: () => void;
  onConfirm: (selectedFriends: Friend[]) => void;
}

// Mock friend list data
const mockFriends: Friend[] = [
  { id: "1", name: "王小明" },
  { id: "2", name: "李小華" },
  { id: "3", name: "張大偉" },
  { id: "4", name: "陳美玲" },
  { id: "5", name: "林志豪" },
  { id: "6", name: "黃雅婷" },
  { id: "7", name: "吳俊傑" },
  { id: "8", name: "劉芳儀" },
  { id: "9", name: "周建宏" },
  { id: "10", name: "許淑芬" },
];

const LineFriendSelector = ({ onBack, onConfirm }: LineFriendSelectorProps) => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = useMemo(() => {
    if (!searchQuery) return mockFriends;
    return mockFriends.filter((friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleConfirm = () => {
    const selected = mockFriends.filter((f) => selectedFriends.includes(f.id));
    onConfirm(selected);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-foreground">選擇好友</h1>

          <button
            onClick={handleConfirm}
            disabled={selectedFriends.length === 0}
            className="text-[#06C755] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            確定
          </button>
        </div>
      </header>

      {/* Search Input */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="利用名稱搜尋"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Info Text */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2">
          <svg
            className="text-muted-foreground flex-shrink-0 mt-0.5"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p className="text-sm text-muted-foreground">
            您僅可轉贈給台灣 LINE 帳號的好友，選擇完畢後將透過
            LINE 聊天室通知您的好友，如果該好友如尚未註冊為店家會
            員，您的好友亦可獲得票券。
          </p>
        </div>
      </div>

      {/* Friend List */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">好友</p>
        </div>

        <ul className="divide-y divide-border">
          {filteredFriends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => toggleFriend(friend.id)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedFriends.includes(friend.id)
                    ? "bg-[#06C755] border-[#06C755]"
                    : "border-muted-foreground"
                }`}
              >
                {selectedFriends.includes(friend.id) && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-muted-foreground"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              {/* Name */}
              <span className="text-foreground">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LineFriendSelector;
