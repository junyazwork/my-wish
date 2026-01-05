import ToggleButtonGroup from "./ToggleButtonGroup";

interface FundraisingSettingsProps {
  isPublic: boolean;
  onIsPublicChange: (value: boolean) => void;
  messageBoard: boolean;
  onMessageBoardChange: (value: boolean) => void;
  notifyEnabled: boolean;
  onNotifyEnabledChange: (value: boolean) => void;
  notifyDays: number;
  onNotifyDaysChange: (value: number) => void;
  onViewMessageBoard?: () => void;
  showViewMessageBoardButton?: boolean;
}

const FundraisingSettings = ({
  isPublic,
  onIsPublicChange,
  messageBoard,
  onMessageBoardChange,
  notifyEnabled,
  onNotifyEnabledChange,
  notifyDays,
  onNotifyDaysChange,
  onViewMessageBoard,
  showViewMessageBoardButton = false,
}: FundraisingSettingsProps) => {
  return (
    <div className="space-y-6">
      {/* 募資活動 */}
      <div>
        <h3 className="text-base font-medium text-foreground mb-3">募資活動</h3>
        <ToggleButtonGroup
          value={isPublic}
          onChange={onIsPublicChange}
          leftLabel="私密"
          rightLabel="公開"
        />
        <p className="text-sm text-muted-foreground mt-2">
          設為私密時，募資網頁只有收到 LINE 邀請函的好友才能查看。
        </p>
      </div>

      {/* 留言板功能 */}
      <div>
        <h3 className="text-base font-medium text-foreground mb-3">留言板功能</h3>
        <div className="flex items-center gap-4">
          <ToggleButtonGroup
            value={messageBoard}
            onChange={onMessageBoardChange}
            leftLabel="關閉"
            rightLabel="啟用"
          />
          {showViewMessageBoardButton && onViewMessageBoard && (
            <button
              onClick={onViewMessageBoard}
              className="px-4 py-2 text-sm rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              查看留言板
            </button>
          )}
        </div>
      </div>

      {/* 截止前尚未達成目標時通知增資或放棄 */}
      <div>
        <h3 className="text-base font-medium text-foreground mb-3">
          截止前尚未達成目標時通知增資或放棄
        </h3>
        <div className="flex items-center gap-3">
          <ToggleButtonGroup
            value={notifyEnabled}
            onChange={onNotifyEnabledChange}
            leftLabel="關閉"
            rightLabel="啟用"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={notifyDays}
              onChange={(e) => onNotifyDaysChange(parseInt(e.target.value) || 0)}
              className="w-16 px-3 py-2 text-center border border-border rounded-md bg-background text-foreground"
            />
            <span className="text-muted-foreground text-sm">天前發送通知</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisingSettings;
