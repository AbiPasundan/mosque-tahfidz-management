import { LuClock, LuLightbulb } from "react-icons/lu"

function ProgressBottomCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                <h3 className="text-[15px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
                    <LuLightbulb className="w-4 h-4 text-amber-500" /> Teacher Tip
                </h3>
                <p className="text-[13px] text-muted mt-sm">
                    Recording daily notes helps other teachers track specific student weaknesses in Tajweed or pronunciation during rotation.
                </p>
            </div>

            <div className="bg-linear-to-br from-primary to-primary-container rounded-xl p-lg text-on-primary">
                <h3 className="text-[15px] font-semibold font-[Manrope]">Session Stats</h3>
                <p className="text-[13px] text-on-primary/70 mt-sm">
                    You have recorded progress for 15% of your class today.
                </p>
                <div className="mt-md h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full" style={{ width: '15%' }} />
                </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                <h3 className="text-[15px] font-semibold text-on-surface font-[Manrope]">Session Duration</h3>
                <p className="text-[12px] text-muted mt-xs">Started at 08:30 AM</p>
                <p className="text-[24px] font-bold text-on-surface font-[Manrope] mt-sm flex items-center gap-sm">
                    <LuClock className="w-5 h-5 text-primary" />
                    00:42:15
                </p>
            </div>
        </div>
    )
}

export default ProgressBottomCards