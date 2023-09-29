const ChatItem = ({ data }) => {
    return <div className="d-flex gap-1 ">
        <div>
            [{data.dateTime}]
        </div>
        <div>
            {data.userName}
        </div>
        <div>
            : {data.chat}
        </div>
    </div>;
};

export default ChatItem;