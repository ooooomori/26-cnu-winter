import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import packageJson from "../../package.json";
import useAuthStore from "../stores/authStore";
import MyVocaListModal from "../components/MyVocaListModal.jsx";

import {
    Button,
    IconButton,
    Card,
    Box,
    CardContent,
    CardActions,
    Typography,
    Link,
} from "@mui/joy";
import AddCommentIcon from "@mui/icons-material/AddComment";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";

export default function VocaPage() {
    const { isLoggedIn, setAuthModal, setRedirectTo } = useAuthStore();
    const [showList, setShowList] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            setRedirectTo("/voca");
            setAuthModal("login");
        } else {
            setShowList(true);
        }   
    }, [isLoggedIn]); // 로그인 안 된 상태에서 접근 시 로그인 모달 표시

    
    return (
        <>
        <MyVocaListModal open={showList} setOpen={setShowList}/>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography level="h2" component="h2" sx={{ my: 2 }}>
                내 단어장 목록
            </Typography>
            
        </Box>
        </>
    );
}
