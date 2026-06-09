import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { getUserDisplayName } from "../../utils/userDisplayName";
import "../../styles/project/ProjectChatBox.css";

function ProjectChatBox({ projectId }) {
    const showToast = useToast();
    const { user, userInfo } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);

    const chatStorageKey = `chat_project_${projectId}`;

    useEffect(() => {
        const savedChatList =
            JSON.parse(localStorage.getItem(chatStorageKey)) || [];

        setChatList(savedChatList);
    }, [chatStorageKey]);

    function handleSendMessage() {
        if (!user) {
            showToast("로그인 후 이용해주세요.", "info");
            return;
        }

        if (message.trim() === "") {
            return;
        }

        const newMessage = {
            id: Date.now(),
            authorId: user.uid,
            authorName: getUserDisplayName(user, userInfo),
            content: message,
            createdAt: new Date().toLocaleString(),
        };

        const updatedChatList = [...chatList, newMessage];

        setChatList(updatedChatList);

        localStorage.setItem(
            chatStorageKey,
            JSON.stringify(updatedChatList)
        );

        setMessage("");
    }

    return (
        <div className="project-chat-box">
            <h2 className="project-chat-title">프로젝트 채팅</h2>

            <div className="project-chat-list">
                {chatList.length === 0 ? (
                    <p className="project-chat-empty">
                        아직 작성된 메시지가 없습니다.
                    </p>
                ) : (
                    chatList.map((chat) => (
                        <div className="project-chat-item" key={chat.id}>
                            <div className="project-chat-header">
                                <strong>{chat.authorName}</strong>
                                <span>{chat.createdAt}</span>
                            </div>

                            <div className="project-chat-content">
                                {chat.content}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="project-chat-input-area">
                <input
                    className="project-chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                    placeholder="메시지를 입력하세요"
                />

                <button
                    className="project-chat-button"
                    onClick={handleSendMessage}
                >
                    전송
                </button>
            </div>
        </div>
    );
}

export default ProjectChatBox;
