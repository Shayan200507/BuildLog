
import type { Request, Response } from "express"


export function getLogout(req: Request, res:Response){
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({ message: "Could not log out" })
            return
        }

        res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        res.json({ message: "logged out" })
    })
}
