import { Button, Grid, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FileRepository from "../src/components/files/fileRepository";
import Layout from "../src/components/layout/layout";
import MembershipArea from "../src/components/spaces/membership";

export default function files() {

    return (<Layout>
        <MembershipArea>
            <FileRepository />
        </MembershipArea>
    </Layout>)
}