import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

function ProfileDialog({
    open,
    onClose,
    profile,
    onChange,
    onSave,
    loading,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div style={{ padding: "24px", width: "320px" }}>
                <h2>프로필 수정</h2>

                <TextField
                    label="닉네임"
                    name="nickname"
                    value={profile.nickname}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="학과"
                    name="department"
                    value={profile.department}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="MBTI"
                    name="mbti"
                    value={profile.mbti}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="기술스택"
                    name="techStack"
                    value={profile.techStack}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    placeholder="React, Firebase, Java"
                />

                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading ? "저장 중..." : "저장"}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onClose}
                    >
                        취소
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default ProfileDialog;