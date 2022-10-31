import Layout from "../src/components/layout/layout";
import MembershipArea from "../src/components/spaces/membership";

export default function files() {

    return (<Layout>
        <MembershipArea>
            <h1>this is a private area. if you see this, you must have a membership</h1>
        </MembershipArea>
    </Layout>)
}