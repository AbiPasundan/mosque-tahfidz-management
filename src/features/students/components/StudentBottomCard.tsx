import { LuArrowRight, LuDownload, LuFilter } from "react-icons/lu"

function StudentBottomCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-md">
                    <LuFilter className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Review Needed</h3>
                <p className="text-[13px] text-muted mt-xs">14 students haven't updated their progress in over 7 days.</p>
                <button className="flex items-center gap-xs mt-md text-[13px] font-medium text-on-surface hover:text-primary transition-colors">
                    View List <LuArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-md">
                    <span className="text-lg">✨</span>
                </div>
                <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Upcoming Exams</h3>
                <p className="text-[13px] text-muted mt-xs">Intermediate Level evaluations scheduled for Monday, Oct 23.</p>
                <button className="flex items-center gap-xs mt-md text-[13px] font-medium text-on-surface hover:text-primary transition-colors">
                    See Schedule <LuArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-linear-to-br from-primary to-primary-container rounded-xl p-lg text-on-primary">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-md">
                    <LuDownload className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-semibold font-[Manrope]">Export Reports</h3>
                <p className="text-[13px] text-on-primary/70 mt-xs">Generate monthly fluency and attendance reports for the board.</p>
                <button className="flex items-center gap-sm mt-md px-md py-1.75 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-[13px] font-medium">
                    Download PDF <LuDownload className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}

export default StudentBottomCard