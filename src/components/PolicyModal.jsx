/**
 * 이용약관 및 개인정보 처리방침을 모달로 보여주는 컴포넌트
 */

import { termsOfService, privacyPolicy } from "../assets/docs/policy";

import {
    Modal,
    ModalDialog,
    ModalClose,
    DialogTitle,
    DialogContent,
    Typography,
} from "@mui/joy";

const POLICY = {
    termsOfService,
    privacyPolicy,
};

export default function PolicyModal({ type, onClose }) {
    //type: "termsOfService" (이용약관) or "privacyPolicy" (개인정보처리방침)
    return (
        <Modal open={Boolean(type)} onClose={onClose}>
            <ModalDialog>
                <ModalClose variant="plain" />
                <DialogTitle>
                    <Typography>{POLICY[type].title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography level="body-sm">
                        최종 수정일: {POLICY[type].updated}
                    </Typography>
                    <Typography
                        level="body-sm"
                        sx={{
                            whiteSpace: "pre-wrap",
                            lineHeight: 1.6,
                        }}
                    >
                        {POLICY[type].content}
                    </Typography>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}
