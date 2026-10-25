// Tendency Breaker: Member List & Cadence 共通データ・PDF自動取り込み
(function () {
    const DEFAULT_EXTRA = {
        opponent: "20261015 / Fighters",
        memberList: {
            offTitle: "OFF Member List",
            offRows: [
                [
                    { pos: "LT", num: "70", name: "谷内 志郎", note: "", meta: "190cm/130kg", alert: false },
                    { pos: "LG", num: "73", name: "森下 幸樹", note: "", meta: "184cm/122kg", alert: false },
                    { pos: "C",  num: "79", name: "今井 聡志", note: "", meta: "179cm/120kg", alert: false },
                    { pos: "RG", num: "63", name: "毛利 涼真", note: "", meta: "180cm/118kg", alert: false },
                    { pos: "RT", num: "78", name: "林 浩志郎", note: "", meta: "188cm/119kg", alert: false },
                    { pos: "C",  num: "67", name: "西山 颯",   note: "", meta: "180cm/115kg", alert: false },
                    { pos: "LG", num: "59", name: "中野 忍",   note: "", meta: "177cm/116kg", alert: false }
                ],
                [
                    { pos: "QB", num: "18", name: "星野 太悟",   note: "", meta: "右利き/175cm/75kg", alert: false },
                    { pos: "QB", num: "9",  name: "長澤 崇夫",   note: "", meta: "右利き/174cm/80kg", alert: false },
                    { pos: "RB", num: "31", name: "永井 秀",     note: "", meta: "168cm/89kg", alert: false },
                    { pos: "RB", num: "26", name: "平野 響",     note: "", meta: "170cm/78kg", alert: false },
                    { pos: "RB", num: "39", name: "深村 麟太郎", note: "", meta: "175cm/79kg", alert: false },
                    { pos: "TE", num: "93", name: "野手 正貴",   note: "", meta: "180cm/101kg", alert: false },
                    { pos: "TE", num: "92", name: "林 輝",       note: "", meta: "188cm/104kg", alert: false }
                ],
                [
                    { pos: "Z",  num: "4",  name: "小段 天響",   note: "", meta: "173cm/79kg", alert: false },
                    { pos: "X",  num: "0",  name: "リンスコット", note: "", meta: "178cm/78kg", alert: false },
                    { pos: "H",  num: "2",  name: "鹿島 禅",     note: "", meta: "183cm/92kg", alert: false },
                    { pos: "H",  num: "11", name: "百田 慎吾",   note: "(怪我？)", meta: "177cm/91kg", alert: true },
                    { pos: "WR", num: "10", name: "立花 俊輝",   note: "", meta: "176cm/73kg", alert: false },
                    { pos: "WR", num: "88", name: "北村 翼",     note: "", meta: "176cm/80kg", alert: false }
                ]
            ],
            fourthTitle: "4th Down Member List",
            fgTitle: "FG Member",
            fgMembers: [
                { pos: "K",   num: "21", name: "松井 勇樹", note: "", meta: "Position : K/P", alert: false },
                { pos: "SN",  num: "36", name: "栗久 裕麻", note: "", meta: "Position : LS", alert: false },
                { pos: "HOL", num: "88", name: "北村 翼",   note: "", meta: "Position: WR", alert: false },
                { pos: "K",   num: "29", name: "富田 快",   note: "", meta: "Position : DB/K", alert: false },
                { pos: "SN",  num: "55", name: "勝見 彰太", note: "", meta: "Position: DL", alert: false },
                { pos: "HOL", num: "16", name: "片境 将吾", note: "", meta: "Position: QB", alert: false }
            ],
            pcTitle: "PC Member",
            pcMembers: [
                { pos: "P",  num: "21", name: "松井 勇樹",   note: "", meta: "Position : K/P", alert: false },
                { pos: "LS", num: "36", name: "栗久 裕麻",   note: "", meta: "Position : LS", alert: false },
                { pos: "P",  num: "0",  name: "リンスコット", note: "", meta: "Position : WR", alert: false },
                { pos: "BD", num: "6",  name: "増田 有亮",   note: "", meta: "Position : DB", alert: false },
                { pos: "PP", num: "67", name: "富田 駈",     note: "", meta: "Position : DL", alert: false }
            ]
        },
        cadence: {
            pageTitle: "Cadence",
            headline: "Cadence : Crap Hut",
            items: [
                {
                    heading: "■通常",
                    body: "クラップをしてからワンテンポ置いて「{blue:Hut}」でスナップ。"
                },
                {
                    heading: "■モーションの場合",
                    body: "クラップをしてから、モーションを呼び、「{blue:Hut}」でスナップ。"
                },
                {
                    heading: "■セットバックの場合",
                    body: "クラップなしで、「{blue:Hut}」でスナップを出す。"
                },
                {
                    heading: "■On Dummy",
                    body: "※2026 Autumn：{red:1回}しか使用していない。\n\nOn1の時と比べても声や動きも変わらない。\nDummy CallをしてからLB,DBの動きを確認している。"
                }
            ],
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACQAAAAAQAAAJAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAr6gAwAEAAAAAQAAAWwAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAWwCvgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMFAwMDBQYFBQUFBggGBgYGBggKCAgICAgICgoKCgoKCgoMDAwMDAwODg4ODg8PDw8PDw8PDw//2wBDAQICAgQEBAcEBAcQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/3QAEACz/2gAMAwEAAhEDEQA/AP0dNtpc0qSLdrIzsrZU9a4Kz0zwhpfj6fUF1A/bp1w1uByw456f1qfTF0/RNQhs1s2+xzgNHIWzsJ7HiuO1e0Fl8Y9OlAULdJx7jirSOc9wk1XwzHu2Quxz0xWdJ4l0yIhLDTfPLdS3b9RUFx8k0ygD73pVQliOwpjsa7+I5pItkWmQRk9C2cj8jUFhrfiOTVIoJJIktmypVByTjr0rMx8pzUmmA/2jasOvmAfmaAaJvM1lbi8VLsBVc4456n2pjtq9wgS41Bgo5G3/APVU1zE41TUNiYAkI/U0kccgT7uKLXGtiu0dzlDLdPKTx+Ffn/8AH+4hPi86e0E8gXLAbyAScc8Gv0Gbau1mOMGvgX9pPT3s/HdhqUWprpyyLksV3bhxwACOtdFOheLuKNe1mcF8EvCeu6j4mkbQ7YW1lH+9uNzE9TtycknPT2r6itfA2qW+uandarIH055YjbsoUNkOT6duK8e/ZsvYIPFl/Z3V+91Jcw7QcEDhs45z6V9f3Ag+zymZMwQEyFSegXmvy7MqyjXdj+m+HsJHEZWo33R1epLAG0+WA8LEqH3wAMmqgSbO5X24NfJ1x+1ZaTavqA0vQHm0HRcpPdFwBlOGC/L1BBr6s0bULfXNGsNe04g2t9GJEyeefWv0DK6ynSTR+B59lzw+IcHudX4ZExm1Dcfl8lsfkawRIykbj3PX61v6PJcJeSJhUVomDYIyeK5y4utMYkG6jVkYhgWHAz9a6WeXFe8j5f8A2hrhI/GEAmjB3Wqhc9/mNdv+yOFsvEniC1MIgSeGOQcjsGJPWvN/2h4LHUPHmnOl8ZIUg2gxncufm9K8s8I+Pdc+HniWbV9ML30UkRie3zgyLjGM9vyriqOzPvYxU8Lyrc/VG91O2tLeSQ3kVtGpJ3yMAMZ96+Uv2ktDk8ZeFbfUvCeoRapfW/zqVbI2njAPTPWvPPGfxN8C/E19NttYtrix0uKzke4giVi7TBsbcheR17VmfDXUbZfD2m6T4a0S4sNKvLt3WOYF5I9oB3H5Vwpx0xVwlc/NcfCVNu575+yH4N1XwzFZX/iWyKvqJZXRsZBY8E4PvX1nrVsfC+qyOkfnWN3k5PRe1eB638StN8AQQ2jXYN8YxOYypJKYzx6VPY/tEWfxBkTwfdWUqlgJIrmJGMfHBViBjOfettjzqWIW1z14Qw31jqFkTiKWBl2dRgg147qmgLqugWOjwMIV2vEjn+FlwoPNejT3S2JkleUJCYSpb1IBOK+Z/iN4p1+fwbp1xpDtHCLyVCU+9t34zkV0RijuhN2JPh2NcstanXxE8Nvd2YaESSN99N2QeDXnf7RtxHD4n0ULcpKWiUMYzkA88fWsG703XtclMk9u04ABV3fHzcdjXnfji11e31uwgubdQUJ4LDGazxC0PreH3+8RFHOkk+5WY7T2Fdl8KvFmm+GPH8kt5HI0VwPmPJ7VxAnvoiQvlxkt7VL4aW81T4gQwWl4Idq/vBjORg+9clM+/wA9adA+1Zfin4ZjncWcbuAemD/WoZ/iuVXNjpCy+mXX/wCKrzhdCgWSWOS/Zowemw5z+dRjwZ4Zk+cs+49Tg11I/IcRD3tDvYvi94gM2waVbxr2+cZ/9Cq1ovjTV/EjeKIJStvLBa+YiDlRtVznv6VxVt4V8G2wUvYG5cdGyFOffIrtfCFtYnWtRsLK1jt1mspfm4OdqHr+dVc5HFnntj488RSWsTx6vO0sa4IWMYGOO61nXmu+J759yXdxMWPKuuBj2wBXV2eq3tmh5gWMbk2qmOAcdc+1Om8T3PKiZUXvj/8AXTuLlOK+ya5fL89ixI/vOf8A4qpE8K6yRu8mOPP95if/AGatabW7XdxNn1yeajk1mzKfNKAPc1MmNRKP/CM6iR+9uYovYZ/+vTz4bCt8+qgdOAp/+JqnLr+kxEmSdMj1YVSm8b6RBj/SEx7DP8qjmK5ToU8PWCDfLeNcFf4QMZ/MCu4+Gmj28Pja8ms0KxTWkqMCep2Ngda8Pl+I+jhd8XmTAHBKRsf5V1fwx8a/218QoLGG2uVt5IJfmMTouSjY5IweaOYaiN1KLSLYXUZtAlykrhiTkEAn3rzzxJKlpHDFEIoI72RFV2PCZIB4rM1TTvG6a/rVktnNLGLuUxvg/dLt7Vh6r8NfF/iNVilgYlMMgdtoDD3NWpHRFH0Fa+LbO1+Otn8P/tKJptl4fuLdnA2q8txDLEO3OTitn4fz7p/B11qbCP8AsqXU9NIIwXRrkBOPdY+9fNN18GvG11caR418U67BpL6TcW6BhKrO6+YoO75hwK9P0zxRpNxJD4svtWimk0LX7e1mg3AefDIZCJFyeOEBJ561SkRURg3urT6Pa+Ek1CXydMjW7srmN/4Q8kzpz/vMteK6tpl74S8KXOiWCrf3l3fZZd45gDDDjkcEZ4r2P4i6r8OPFNpDpL3ytbQzHAjcZKHLYJ7EMetcBP8A8KQ0+7Rru4vLmeEDDfM4+mdtXGokc9ipqAtZvLvJdKgcpFGu9pMEFVAIxv8AavUvgZq8H/CTajaGFIvM02VcLzuYBj15rzK68RfCqSRnsPDVxfqw+8yHDfmlei/DL4h+H9Lu4xpngf7AjwyL57KAysVYY+6DzVfW7dRcp4rF4g8UxR/Y9OgliiDbVdYs5I+oNdX4Yh+IXiDUre31ZbuS1U4xsUY/QVqWHxB+MTtd29jodtbQQTEQuy8sgPXqO1d5J8QPikYoktmhgO0eZhD9786yqYtMuJY8afAew8deGiniQNEmjxPLEzY3KwU/z6V+RNtr2p6T8R9I8QaleNeWvhrUMwxHJURxuNqY6ZAGK/Wu41n4ka1ZXNnLqAjMkLhsnhgQRjrX5LvpOq3PjG88K+UAZdUFtMScEF5Cu4Vg6yNU9D6U1z4zaf8AHn9pTw14k8S6KdCs7FUhBVgFchAA3ys3pX6HWfhrwjPrt/Fda0rwwKXyAflXHA+7X42eOvD1z8N/HP8AwjNw7C4hMU9vK3G5cKWx9Ca/ULw1DHq/h2x8R6VKFbVIVWdhzuI5rKdZIUmfWXjbxt4W8OaR4U1N7oXFibWS1Up95SwQDI98V87aLf8Aw2fV49Kn06S8jeRriWV3b5fmJAOGHrWJdeG7qdUt55TJFCcoh6KfarVh4de2YyREKzDGa51jkjI+jZvj/MLtrTwlpCxW9soSN2OQoX03NmvG9e+NHjbU72e71Cdo4bclmU4xgdxisgaTcxgvv4B7VyHxA1O28MaTJdahb+fa3CbHfoF3DvXTTxikwPIfF3xx8H+JdYuI/EVy1ybmIxRMrHhgeg/I1n/Bfx7a2/8AaPhTQpW8+OeV4lOTlcds+mK+SLjRdLuJb17EfcmLQv2G7nr+Ne0/AG5+x/ESw0PUI1e6kWRvNA6hlxit6layEfX0vijxZe24W7MhYZAZTgjH5Vz8jajcZ+0md/8AgR/xr2OSyjilliCD5CeKqiJEc/KK8fEYtobR439h80fOkr/U1LFoaZylmefX/wDXXsqpEOiCn/L/AHRXLLGuwkjyZNFUdbMflVldKk+YJGYt3BwTz9cV6dtX0o2r6VwyxcrjPLzodwvMbqD7g1FqfhS68RaZNo1zKsaTKVDKCDzXqpVD2pyvFB86x7jnoOtb4fEybsRPY/Ouy+Di/DTxzqtqZzeuNPeZoxyzKVJx0712XibQ5tf8D6boViqzWur5xESN1uwY8H8vevqi10fwtH8Udb8W+JLuOzhh0by2EpAOXRtvykgnpX5df8J7r2jXuqat5zOLC9mktNhyjRCQ4GB6jvXVWvY5m7H6Z+GdC+waHpWmHlrW3EbcY5Ga3V0IKNxOK534c+O7X4ieDtP8UWahDMoWRR2bHP8AOu2leYj73FedOo0zoRWi0ZFGM7qn/s7afQVELideM09Xkf8AjrN1JDuPMMKnawpu21UZCEkdqDGzLknJFQ7PQ4NCqy7hcVpmPHkfL2pYpX5Vo9oNKqHHLEmpBkUnUfcLkZaTsxFIfMPVjUwBPSnbTms51GFyLz7hBsVzigXN4c/OalYDqRULOoVsVpSm77m9O9xuq/EvWvAXhW9gXSxqS3rFxMTxBjnnkdc+/SvzHk+Iuuaz8RdR1jTEe8jiDeedp8tTxwOnSv1D07+ybrTNTsPEKedZzRNhMZJbB+teP6DP4J8LeHNZ8P6V4RFxcagHCy+Vjbk8c7a+joYzkR6ixFo2MD9nLxjda/4b1K3kj8tI3JUMOM8dK92aeV40ZnA+grzX4WaJB4c8FyWTWv2e8aQsTjBwccdK79ZIZNoDAYFedicQ5ann1qnMXY7hIzuaQflV9L22fkSqB347/lWcn9mN8spG4e4qzBb6KzMqLz1PcV5zrSLpU9D/0PvifTH1JIrRGI86EMhH8LYrxjTfEV3r/jeA6lYvDdeHnMW48CRfWs9vjHrcMFmthZ20bRIATuOc4Hq1cNqnj3V5dY/tS+nhtZn5UQnOT78mtDnufZskclxK9wqECXkCq7W0i/fG0e9fMyfFjxjLGqC/WNQMZVST/Ksi/wDiF4ruSsb6rcSFuBhMDn/gNOwH1g1ttXczqo9zUVq9rDNHM11GCkikc8k5HFfJM9z4qvmAvJ7m52jjdhQAfwFaOjW00utaUHtP30UykuzHJ5HvjNILn1nrmq6FYaxcyahfrE8gRjHnHLDOa5+bxh4LgjEj37yDOMIAefzrx/4saBq1x46ku7ZdkMlvBy7DIITnjPNcB/YWt5wmq+UD1AA6fiDVxlYtLQ+ib34heCIbfCTyySMcBSo/xr4+/aXuoNb1PQtU0aBJ2R0jMUncHGT39K7l/D06KTca4XHpt5+n3a8f+NMmmW2j2oMkss0TA7lHYd+ldUKnusxlRUnyor/Be5v7LxhY6tLFFHbzTG3fb1zsLccV90SJuuby22eYCjBgemCDXxvpmhaXY/DvwvrsUUjzwXSSSN93GSRznHrX2dduk01xPH8nnIXHtwTX5Pn2H5azl3P6V8OMTz4J02ttD4Lk0jQPCZ1vRtMT7dBfXMjTxdVjMrMzH8zXoPhnxZban4eEHhTVpJ4LD9yYk42Ec44PvXn+ueD9ek1S81vQrpJIpbhhMhPB5NPu7DUPhr4B1H+zrkRNO4mZ1AJViVz/ACr3ckzK1NRZnxNwP7avOr13Pfvhrq2uy+ObaK4nlYSxOhSRmxjGMd+a577D4tmvNUENoZgtzL1kYHaHIH6VrfC/xXpeq/8ACJ6tNqK3FxebYiBx87bQx6d81JrfiXRh4h1mxllKSwTMu0HkjPWvq4Surn4LXpOFVxfQ8Y+I1v4h0i5tLzUrZbSzn4XLFmz9SK4Z4ftDCQ3AjcA4YccGvVvHGp6f4g0VbRo2kaBsgHuK8XsoIZ7xbc6cbazU7ncty7d+9ZypXPdwmYqnG0mXriW5tNOLW+sI1/AD5GIk78kEd/xr64+AfxOj0XwfZ+INVtYdSvdRkFkokAQRk4+cKAR/FXzSb7R47W4jtNKS4e2XfGWYDnpnqPWvsT4e/CqzHw30jUrO0VItXIuX3Ov7knGQOenFVSwcrng55VhWXunW+MtA0bXLuPUrmzS6ul3ISp+8q8bRiq/hi90HwkX0G2RLWUqX8t0BfB5wGPNewSS/DfwxpFkurXllZSxKVBaZS3bBIya+evjF45+H9/4u0O+0C+XVGRTFcG0UvsBBxnaPpXS8I46nyuGwDUtTL1fxZr+t6vcILtYNKj3Yj4yXxzz16Yqtf3sC/Dm2vGlCxRXjq3py5z/KvEPEWla14gjltdAhYQrMx3S5TKnGD2r0iLwT4gn+BraDeXEC6gt8j/M42LESxGTn0x3qFOx7MaNjGm8UeHxGyyai0bkjhWI4/OvLviJqei6lNb3OlyS3PkZJbcfvfnUtv8JtQVzcXeq2tvIDkhHHIxjuTWm3g3wnpVuBqvidk8wnIiKnr/wE0Sakj08HifZO6PFV8Ua0sgjj0wtHuGWZjnFd74U8XR6P4iTWmtlUbcN65rP1K9+C+lF47nXrm4KsQQqMf5R1uaR4n+D0EYXTbOa+kK5BkVuf0FZqMUenjM8nVjynoP8AwtsvLK6RqdxJHFU5vi1qZ+WCzZ/Uquaxx488PRjFr4YLoO4H+JqWPx9cuf8AiV+GVRe+7HT/AL6qXUSPDlK5bHjnxVqBAtLSTJ/2cV6r8JpfGVx43u1vrWVY7iwlWMEfLvKHv61594b1f4ieOdRbSfC2jbZ4Ru2oB8vuSTivQ9X8L/tG+FIrfV9dVY9LkQhSu3O5hxuIPAFHtDHlPO7PRfiVLJe2l1BHCEuJQN8jA7d5x2qzJ4H8TON1zqdvDnqDK3H6VwkukeMrq/lur/UHLPu+4emT2q5H4Xe4G2+uZ5fX5qxlioofKdSPh3ZLH9o1PxXDbr0O2TJz+NUf7O+Gun5TUvFcl2em1Dj+TVnf8ITp6f6syKO4JyKsp4P0eMZktlkb1OawePRjKdiw2qfCCyT7OPtF/IeQ+T/8VT4vFfga1YLpegPc7uu8n/E0230TSYCdtioJrRg02xZgyWwQisXj0S6tiZ/iFJFbtY6R4YhSJ+u5RnP1wai0f4kfE/TNdtL7TdOt7e0hVlYeWpbBGOpWtKK0RG+Va11RNgGKmOO1NqXvK5wF14k+Jt1d300l4sYuZWkQhACNxJx096g/szxzrYU3esSKB1WMlSfxGK7qaNWPSn27+UMetOON1NHKx87fE/RY9N+HXiS/8UX96IoVEdu4mfiVztT+L+9ivhG11DVLaGzubm/nbake4ByA5RQAxAPX3r9Af2nJQnwM1bJ5mvoAPwlSvgPS/D+s+KLeaDRkMjWNsZXA5woArtpYroZVJ30O0+FNvBquq6r4akvZZpNZw0e9juiYY+6c5x8tfoP4T8JQWHh2w0nVraKW6sVCFyilnwAMkkZPSvzL+GfiSLTPEuiarA3Es3kSn+6ckEV+ucdrBAUNqS0cqK4J75rzMRjJXdiUigmjWULYghRB6BRirQtVTgAAegAFXQCDQ2a5ni2VYphJSPvED0ppgLArnmrYIx1pCwz1qJ4oTIDZn7ZbM+Sp+U4OK/Ozxdop079qxNKyFgnure4CgY+YuSc1+jTv+8tmHQOCa/OP9qiW70T4+WGv2GSz28bqV77Of61UMS7XBysetftk/DpNS02x+JVpCZG0XEdxs4OwqT2/Cuu/ZK8X2XiT4Wf2EZP9N06U7Qx52AL0/Wvo+2aPxZ4HsRqKI6axZBZEbBG4Lj8+K/Nn4Xz6h8Nvjd/wjMqfZbe1lMLjcNpjbO09eck11VpvRib1P06BDorjuOfrUZXHSo5b20S8lSEjymUMv481Al6j9SK8+o7CTuXwdqFT1fivjb9rHxpqsU9j8O9KtJHsrm382edV4Q4Xlm7D5jX179qQ9+lSS6ZpGrxPFqlvHLDcDynYjLBW4613YSqkNrQ/JjwTZQW3hnxbaa5qUe94VnsXU5xIGRSg6dgTWp8J9du4/iD4Zv7UG4nYBXx1APc1k/E34NReGvjL/wAK/wBP85tK1hmMEgPyhseZgfka+m/2Wvhxr+k+Lde1DxL4fktNO0wGOC9lXEbkbuhz9K9CpXi0TY+2J23z+ceDIoLfUis9wCxoE4Ks7HO8nafbNMZwPmJ4rxsRPmZdgBpd1VjOnc0w3SetcziK1i3uo3iqLXMeMlgKalxC/COD+NS4El/eMZqi92sEF1cy5CQoxyPXHFRSTANt7VmX6/brC70wZVbhGQsPcda1pKzuZyeh+bXxV8W6lruuXd1fXMozuiRQxAZBwM4PP414/IrWtgtrcSKguAEKt12Mwz+NfeMn7OWjQtHePdtdSQbiqv1JPrwPSrTfs2+FL/UrbXNTlYtEuTF23A8dvStalaT2OVxPcfhz4X8L+EvAulaX4VQpZNCr4JJOT15JJ7V1LjnisrRreDTtPt9LsxiG3UIg9hW39kvSwC28jlum1Sf5Cs5UZSd2b8xVKc5xUqJkYUYNbNv4e8Q3fywaXcNn/pm3+FdXpfwf+J+rBX0/SmWNzwXwv8yKqGEky1qcCI2Ubz2pjIo69691i/Zw+LcylLi3jUfUf41s6R+yl4xm3DUZ0swx5wc/j3rZYCXYpxZ82BkzjPSh2jUHcdtfZlh+yDZo6yXmvSnHVVAwf/Ha7aw/ZY8E28we+nlvOMbWxj+QrSOWSYcp+dsmq2dqMGQMfQVYW/8AMQSQoXB7Y5r9NbP9nv4Zacnl/wDCPi5Oc7mIz/Ot+1+Fnw6swqx+HYbYJ1ZiP/iq0llNx8h+WEa6pdLuTS5imcblBPNasXhXxVPbefbaPcFc4+5X6yW8Hg/SE8u2axgQcYYj+tLd+KvCOnpm61CzjXr8hU1pTyyK3ZqnY/MnTfgv8V9Rg+32WjEIAGAcHkfTFdfpn7O3xVu023FtFapIdx+UZz9dtfZuq/Hn4b6NhZL7zR22DP8AIVyt5+1L8PbWAvbRzXDf3QpH8xXR9Vguom/M8Hh/ZX8VuR59ygDdcf8A6q6W1/ZA0qEpcaprDI3dR0rav/2urVGH9m6FLIh/vEf4iuT1b9rPxJMR/ZWgBF77iM/+hUOlSS1YJ2PRtJ/ZO+H8D+fcX8t0T2xgfmGrrv8Ahnn4e6bBuigZixA+Yn396+W779ov4iaxujtFXSdwxvBBP8zXE6n8U/ihdokM2vmQRnjj/AVy1JUUbKq0f//R9JPhfwSminU5LeaZwM7S2M/pXzfrWoPYX5bRdIfBbjzGyMflXZeJvEGuapD9htL1Vt0Hy+WOf5V5Pcadc3b+VqF3en/rkg/xFanPY+uvCWuQXmkW8l5ZwWs+0ZXgnP6V2qX15KnloLZY85B2gEfjmvhvT/Bmry6kl3a3upokYAVXXg/X5q9y0vwJ41vUVwLgRsPvOSo/Q0tAsz2681aTYY7u/VAo5Ibp+tc5H4k0K3uIJBq8bmOQAYcbiSQMdetcWvww8WmTyLiaGOKbhi8rZ/lUh+CkOmI0lzeQCDO9n3kkFecg0XQ7M9m+M3irRdG8R6HqGqTSsl3YJt2gtjCJ1HfOeteKP8TNJkeQ2ltJKoOFLIV/HkV6J8RNL+FXiOHw1NqHivF1Z2vlAR4bIAQcg/SvOU034O6bIzza3NLsONrADP0waTkjRbWMqX4lytL5SwpF6FxxXmvjLxDrHiSWKCB7aA7gufMUgg+1euS638CbfLmOa4ZT15wf/Hq5nUfiB8N7In+xPCEmrKzAgrnOR/wLtV+1ioPUKLtK7OQ1vxnry+F00m/vFW1tZo1xCN3Qhuxr7q8OahFrHh/TtRjYtHdWvU8E5X/69fJlz8TJJtPnaLwNFGAnyKwzke/Xmvo34d6nc+Kfh/pl+9r/AGVcxjDQLyFAA45r8+4mknUifuvhNjFKE6b01PBtL0+7v5tTsdNRy4u3JQHJwGYdB61J4q0mZLbUdDvojia3YqjcHgZ/pWj4d8V33gP4i6h4g06zXUWichoGOFIJyT+lWvEPjC48X+KZtd1CxFi10jKsQ6DIxXlZbKEY6SufuuZOpKvODh7vLv59jxr9mHwx/wAJVb2EGmXQtH8PakGnMr4JVXGVUHGfumvdfF3gXwofGet6g2vJD5uMgOA4Yge+a+R/hdo8p+KWu+H7a8ltHtnNyojYqCQSRkA4PSvcbjwPDqN/Lq188ktxKcO244OOOma+5weOXIj+PuJ6PJi6nqaEukfDXRoFu7/xbI46FFbdz36NXKXnxF+A8F19lt729uXj4JELlW9TW5F8P/D5fbPa+Z9ea1o/Afh2Ff3dhED67RmuyOOR81Ko2Y8fjz4WorfYdDa4V1+88ezd+a18peOPj18T0v8AUtM0HxQ2laRbSBYLSIEiKIYIXIYDPXtX25F4XsIWCxQIAVwPlHU1+YvxQgbwl478U6dchRBJcA4wDhWwMiuqjmGtjGUTk9Su9S8R3z6vrmq3up3DkuqtO2znnGOa+iP2f7zxxp8urN4Lu1scMPNDKXZsqOM5GK8h1HwhP4R8P6H4iTM2n6zvCS9gfl2j9a+lf2S0ivLzxHA/zSRsGb/vlcfpVV8a9hLTY9Oif4r6hGUvNakVX5OCf8avvovjm90O48P3uos9ncsrPgkOSucc5969gis90IOMH6VJHZYPWvEq453sQ6kjxCD4aJIq/bJ55HXuZSa2bT4baeJhNKpkA6A17AtqAetSeUF71k8Ww9ozzqHwNokL7vsMZz6qDWnF4Y06A5trZI/91cV2Xlg1KkYHFSsU2HtGcsui/L94rVmPTEhRmLFiBwOma6IqKPsr3LLbwfflO0Z9TVRrtuwe0Z6T4A+LnhL4ReEb+6uY5f7R1YhI5I0LHaCM5IHHQ16HrH7QGg/FbwR/wiehxzrNDGBMHRsSKo55IH51R1P4AXeh+BovF3ii4WU2uJnt4kDDYeMYIHrWH8LPBN3438UXc2jRto2gGM5ZolDlOcY69R7172HotxE6sjx1rKaBShxtBwADnA7U0WpHzYr7K8afsyaVbaPJqei6rO91EvmrEyjEhHavkhkmt5ZLW5XbJGSrA9QR6142Pp8rOim76MzWj9alhgVvvH86nKAnFXbOOFp0tZefN6V4VWtZFYag6lXlKC6RqlxKJLOxluIu7IpIA/AVr2nhjXL0sYNKuABnrEwxjv0qH4ufGPWfBfwbvbfwnDHZ6jb30dt5rAEorvGpJyD2Y1Da3cPw80jRPFnjjx1dPPqaQvhQot5DIASmcj1x0rijjbvQ+oxHDUlTU2ipLCYXIZdpQ4IPYio857Vt666vqayQD9zdASq395SOtZZCjg9q66VRs+WrwdKVo7FNh7VCy9CKvEZ6UJEGPPavQpO7JhqfNv7UkpX4Ow2uM/adRT/x14zXF/sieDpJ9P8AEviO6cJb3qmzTPPGCpx+K11H7Wsz2/w68PQoMi4vJnI/3FRq6D9l9TZfBW11Flw1zd3D/lK+K9C9pFTirHwp8QPBv/CrvF194ckYBFu1urchcZVmXPP1zX6reG9Si1fwpoeqQD9zNbR4kzkMcDgV8W/ti6Gv/CR+G9cZP3dwjK56dnP9K+hv2ddY/tL4HWaOwnNhcvEqfxIi7QPyrhrQ1Zmux7GxweaiZ6mYBjwcggH86jKcHArzm2maOLtoRMflFLtkVd5GF9areZIWZSuAOlKJn+67ZX0o57jrxtoSF2QEqOVzj8Rivmz48/BjUPiIllqWiyCPUbaPyyT2VwAT+lfRjSgdTTHLyyB+c+xrenF2Oc4/R9N17S9B0LSlkP8AxLogr89WFeK+J/2e5fE3jS78ZPetFcXW0jBxtZTkHrX1ESsa5kcAe9RCeA8Kxf2FdE6zas0BwPhbw14g0SzNtrt79tdeEfvgdM8muk8qUd66hbHVrhQLTTp5g3Qhc1di8JeMbhlSHQZ2Zuny/wD16xjCUugrHHok7DCnmllsNWltnRLrYrDpj/69e12XwS+J17biaPS1RXxjJOf5V1tt+zl8Spo1WWOGEN1JY5H6V0ww9TojSJ8jaj4XGvLbXGsRD+0tPbfbXSxfMnBGM9T1PevQ5PFniXUPCEXgKWVk0+Igu5Qq0hGOSc+1fUGm/snavcpnXNVaM9SYjwP5V1Fn+yb4Wfa97r9xKwPKgAD+db+wqDPh5j5UMcHmKFhUKOfSq5ufM+VZBn61+klh+zN8N7RPnSS7Yf3if8a6+D4K/De2VFXQgxT+Ik/41dPBN7jsflbHp+o3bAW0Lyk9lBNaEfhLxXP8sWl3L/SJj/Sv1wsfB/hDR4/Mg0yC3VO7KD/Orb6h4dgHyS2kQ+ij+ldCwEerMpR1Pyk0/wCEfxE1UqINHn2t0LowH6iu0sP2bPirKjTQ6bboAcfM4VufY1+i99478KaND515qduiDspH+FcJqfx8+GFowS51Ekn+6f8A69CwFNbyJsfKVh+y38S5yDffZoAfSQMf5131h+yVchVfU9aCMeoRM/rur0Gb9p34YeY9tavcSso+XHc+n3q7Cz8VfE7UtNS90LQbcxPypuJXVmX1wAa0jh6HqKy2PPbH9lTwtG+6+1GS4HoMj+pru9J/Z3+HmmHLWQu/USgP/MV5B8Qvjf8AGPwRdIt94ZiggbIEisWQntyRmvF9Q/aH+JOqAu1wLJj/AAoAcfpVN0Ig7dj7sHwb+GscnmDw9bDvnYuB+lbEfh7wJpQBit7K2MfQts+WvzQufiz8TLpNr+IpFXoFCKDj61zN34o1+/Rl1DUZpi3U72XP5GspY+ktguux+sD+JfCWmx731Ozj9w6f41yuofGj4c2YkS51cfuPvGPofpg81+VbbH+/LM3sZXP9aiKRj7gP4sT/ADrCeaRWw+drY/RyX9p/4VxFltr25nI/2WFcxqX7W3haOMnSNPmvCOobKn9Vr4CMzo3yKg/4CKQ3E7ccD6ACuV5yZSqSPtKb9rfUXVhZ+HCh7MzjA/8AHa4TXP2oPHl/GY7aJbQ5zlDg/pXy5JJcklfMbH1NRCNxhiTn61Ms8aJ9pI9uuf2hPikylU1Ros98k/1rnrr4yeP74E33iByW6gK3/wAVXnQjZhkDNRNHtboPyzXJLMpz6jjNm5feIbrWPm1G8luce5A/rVCPy93yl/8AgTbqrAnGMDP0qSPINZPEzf2i+dmpG6Rjcqgn3qcXk3QYH0rPDDHNLvFTKs+4e0Zba6nbq5FNaWVxy5qt5g9KUP7Vk6j7h7VjlDg/eNSlmPGaj3il3AUubzH7Vn//0p4fi3YQqE0nwbEo/vNjP/oVQXfxe8ZHB07QIo/Tao/xrcSztV6QKPwFXY1eIYjRQD/s14f9psOZHM2/xH+JOpRJE8n2LzRyuwfIfTPNRajefEvUI/s51lgo5DAY/Cuy2ueWQZ9hT1jOcBetc88ynfQOZHmj6f4puABqV5JMR0+aqcnhW6vmAuHcY6fOa9fW1z94ZqZbJM5xUf2hMfMjym08EW1nKHW6LM4ySQePbpXQw+G7Ycbg59SK71bOH+7Uq20Y6ClLHTYnJHKw6BDEBjDfhWhHoVmTu2gfhW95QHQ1MseFxms3jJ2tchtLUzo9Kstm0oDXtXgVy1idNjXEcSnH5V5OoFev/DtQt07N0KEfoa8bFtzkuY/TvDnHqOJcUuh8BeM/ih4M0Lxhr2mapIyvBKQ+M9ecdBXDS/tC+C7W0klsN0gGFBwcgnjODzXmXxV023uf2hr7R7iPc1/qCrjGQQc15F8WPAv/AAhfxJ1Pw9bZWJwjhQMAAgdBU4TDJQcj7rjLjitRxfsltY/TbwHpdjf2+leJdLtVS61KHfLdDhnXAOOfrXobIFeVPQ1xnwVtCnwh0Ka6mYS20axx5HLDCgHGeK7p4SWLE5z1r1LWsfh+bZjKvNykUQuD65qZVJ69Km8nAzmk2EcURnY8OLLUCK13AvUGvyn/AGgLJL74yatZyDEEzxJJ9HfbX6qI7Rss3Ty6/N/9oDRvsfx202FH8w6ytpNjGMZnIx79K7KNQ0bVj6U+L/gPTv8Ahnuw0y2QFNDtYbmLjBBVN39K8y/YqnNxN4mMnDzsr/gFRf6V9YfEG2hl+G2t6fcNhIdNCEgZwFjIzivlb9iNYprvxQV3D7PlFyuAy/Kc5/pXTiJPmRLep9tCNfLTA7U0xgc0kLkIFbtxUjMK8ipuJxI6btyadTlAPWlGTMuUYEFJtqbatJtBNaxkPlZEFq9plxJaX0F0AD5LhufaoQh7VLHExdUXqxpYeT9oaqnofbuifFvTdT0ue/1JkmttoUxYLF1GONvXOa2dE8U232aXxLppWDS7mPyorVVw0bKOjD1ORXwN4Uuri18ReItOtSzeS0Fwrg/dzIisQPTGRX0v4Y1m3ufE3iPSI2DRqYLqIAYB81mJIH4V+gYF3jqQ4Gh4w/as0vwSw07ULf7VespWEDkjPrjpj3r5jvLttS1C61WUYe9fzSPcivPfjp4dl/4T2+u9NXy4Ps+XJ+b5jtJx6c16FDCF0iwYEEmEZPc14Oe22RrRg7lIsc9Ku2ePtsc0v+rUHIqqSEPzHio/tcUT/MeoxXxlfDSmtD0cvrqlVUpHG/D/AErQvihr/j74d+I7lWhvxvt3c48txyCM+hAriPG/wu+Lg8GW3wu1a/ttR0ewkAt7wf66JFOAc7scDGOK9W07TNDhuZrzSdLZb2U5aWMfMfyFb8VnrlzIIV0u+lU8nCOy/wAq8/DZVO/vH3WYcVUpU+WBEjwR6fpdisnmPYW4idvUjvUEjAnI6V1tn4M8WXozp/h+5IPcxMo/PFaln8JPiZqU3k2+jFPeQlB/KvpqGDZ+dY2pz3sefqRTixRSdpO7jivaYf2dfipIyR/ZoEZuuZBgD64rtF/Zc8Skqt1qqQAjllPTj6ivUp4Ro5IJpH5G/tdeJ5ob3w74cih3W1vC7Ss3G0zrsQj1yRXu/wAJdLXQ/hTo2iXUqxNIDL1HRzu9fevrPxt/wTr8JfEHUINV8V+KbmXyFjUqpbH7ttw/j7mvfNB/ZK+Guk6db2UxnvVgRURiCeFGPetvqzvcvU/Mf48eG9D+I3gFtOmmH9o6YPMgePluO3f1NfMn7MvjG70bxW/hu6iuYoJwUeJo2CM/IyMjvX9D+nfAD4WWq4GiJnGMsgyf0qxF8D/hBpt7HqH9g2dvLCcpJtQHI/CpnhHJ3BLU/Mt4vFUczi10S4mjY/KQhPy/hXQ2/hbx7cA3EOg3HkRrukLKVwPbOK/VIS+GrOIPZ3Nnbxx8Z+XAx71l6l4v0G1iuba91u1USROFXcozlT3zWLy+N9WdtOpZH5WeEdG1zx94obw/ofySqW3IRydn3h7fjX0Zp/7K3i2eRTeXccKHqOpH5V5x8CNQj8P/ABy1fWLucWumh5wHfhZN5PIJ4r74b4t+D0DPaXaz5J6OO1a08FTS94zryTZ4Av7I9omGutdkH+4P/sTXQ6b+y54KgbFxqVzO/cMRj/0Gup1f423qsV0WzimH+1KBn9K811L44/FONj9k0C3K54IcMf8A0GtZKjBbHOeuW/wC+GtsFjfRRfEfxuf/ANVdXZ/Cz4f2SAJ4egiAxycdvxr4y1X4r/G66maWO3ktlPRY1YgfliuI1Hxx8db9WR7i9SNuoWN/8az+t0l9kmx+lcdj4a0dcWv2S1B/vlR0+ppk2vaJajMuoWKf8CX/ABr8srtviBqca/2tBqF0R7uo/rWHNomtzjbNZXyAepdv6Uf2lBbRHd9j9Pda+LHw/wBE/d6hrEZk/uxfMP0Brz6+/aT+FdlIEa9kk9wrf/E1+eDaLcWJLTQzKDxlwf60ptrUoWkiDH3OK555prsLU+5NU/a48I2oKaLayXnoSCP54rj5v2ttfOWtdCiKHpkjP/oVfIcf9lQt8zBM+9XiNNjG/wA1Rx/eFZPMpdAVz6E1T9qHxxqB/wBFsVsTgjMZHX1+8a4+8+OHxSvd4TX3gU9sdPpxXkT3dqcBGBqZFDruHSsXjZsVmdZffE34oXw8m88STTQn+Ecf0rGnv7zUNsl5eTO4/wBrqaorEf7pOfSnCGY8LE35Gs3ipByg7s/DMz49STU0cgxjA4qM211/zzYfUUwJMh+dQPxrNV29xOJ1XhiXT08R2F1qUixW9rIJGJHIA7+lfaz/ALR3wz1W2n03wrqgvdSgi2xpGDncB9K/Pu6eLZHAyh2uGCbT/FntSeGtOsvg34u1Dxh4v0eLRdPglUQkYVpg2AMDAzya9zL1zKxDuj65+JEmpap8IB4i1yV7q5kuI/3RGWjGeegr5PjSzuA32eXDqMmNwQ34Zr9GPhhHD470iTXtThDaTqWJbe3dMLg85weO47Vy/wAb/gz4YudBl8R+H7SOz1LT13DywFDgdiBiujGYNWdgUXufA5ijI5HX1pvkR+lWyZH+aZdrnqB2NR8E4Br46pGSZViDyI/SojAAeOlWsgVG23PNYSkx2K5t1pBbJnmp/k9aX5exrJvUzlF3Gi0iI6UfYhg7RUwkAp4m444q5IOQq/ZQB81VntATxWmWPem7hUWDkMv7HS/ZcVp5FGRTQuQyzABSLACCR2rTA55FCxjB4qri5WZYi9qkEXar/lg9FqQRH0xRcORmf5GOopfIyOeav+XTtuOKEx8jP//T9JWKP0FXEjTHA/So/JJ6cUz7PdD7suK+HZyakuwbiNoqwsaEZxVdILrOWlyKuruUDvSdxoaYh6YzSeUMVY8lpVPzbTTjFhdoPNMZUMIPU0bI4/vNTfsN2z5835c9KtDTVcfO1AFYeUeQakwpHBpx0uEHO41IliqD5GqWaLbYoujdjXqfgWYg5PXdiuBSyLcE13Xhby7ZJZZvkELAnPoO9ck4NtH2fAOJUMapfI+M9U8H6NqX7TF1cXcYkeN0kXPQMAOaj/aA8GaHJ4s0jxItupunC+YeocAkAH8q9A019O1P9ofUDG+VWNW/ML0pPj8lhZeCofEF2TmxkQFgC2A0m0dB6mvSw9O1PRHZxhV9pj5anpOjyx/2Hp7QRLCpiUGNR8o464qYgE5qr4cdLzw3plzCcrLAhH4qK0RG+SNvStfZt6nw2I0lYrFaYwRPv8VO8kSffcKfc1VnvrWJ13lWJ/EVl7J3IjAgmvo0gkEMLyyKOAAOa+T/AB34X8U+PPiN4d8Srov2caGVErP/AMtEQlgO/QnNfWtvd208jBJNpHURjJx79a2E0We5RZYLaSYN0IQ8/pXTTptal8h594r1nVtQ8P6hBpenJNPfRCHDnggggk/nXGfBfwfq3w40S9sLiGFDqDmV2j5YMT05HTFfQVv4M8RXDbLbQ5yT0+Q8/pXV6f8ACLx1qXCaQ8P+9xWk+eT2F7NHl25mUEjn2pw3dSCK9+sf2d/iVPiWKKKIDj5mGf511lr+zV4vu2VdWu4ohwMjnA796yWDm9bD5T5VV8/hTzMqcGvtDTf2V9KhQi+1ZpJD/cBA/ka6m2/Zo8HQxgT3U0h9R/8AqrVZdJmfKfA32lM4G38c08P5mMAZH93J/pX6Tad8BPh1bRKDZG4derPjJ/SuktPhT4G07mDQ4pT/ALWOK6YZY7ai5T8vY/tjNsitXkI9FNaUegeLLx45bDSp2Ocj5cZNfqWPD3hTTUJtra2snQ98AfjTdX1/SdN0ie6hvbRDAhP3lHIHbmtaWWcruyrn55/Cr4QeNPD/AMRIr/XtPf7BcRkTs3R15Kof+BYr6d0m58D33i3VNFsNKkstbsIl81iuEMQ3bRnJzjBrif2evjTrPxd8E65qeqzRNf2l88axIefJQrhupr06bxyNRW/0jw+q3N6kUpORg5UHgk44FfSYRWRjJnjHjf4OW/j2WWbTLqKKdpkhdVbJZGGST16EV0tj+yfZi1gS+1aQbFAwvb9K+Ev2UPEHjmw+N3j3X/FH2g2WnzSP5TZ8gyAjb5f4Zzyea++rv9qvTEWRLSzaaRTgDBHP4152Ycjl7xdOrodFYfsu+DLaPEt5NK/qf/1129r8B/h3bW4hk07zmX+Mk5/nXz5fftZa0lwsVlowwRk7j/XNc9e/tTeM5MtFZpH7Dt+teenSS2LlUPtHTfh/4P0kj7HpMaYGMkA/zro49P0W0UmOCGL6qtfni37SHjDUf3M7+SG9M/41yviH4havrEbxx38+WAyQcD3AyKuFaC6Ec5+l76ho1pwb2GIDsNtYtz418KWsipLrMSljjAx/hX5Z+fKRl5pGz6tVOQ+m4n1Jq/rMULmP1PuPG/g20l85b4TP6q/H5ZrjNc+NegaZE7BUndRwoOc1+cSzzLwHb8zT/PkPVjXO8wQcx9iSftP35kkjh0BHH8PPX681xOp/tGfEua63WFlFaQf3ev8AQ184mdyc5NJ5z+pqXmAuY+gz8f8Ax06t9sZSTwUXj9QKyf8AhcmuzuY5rdzG3X5s4+mTXihnYrimiVs9TWcsbcLnTa7fz6zPLK1zNGkvVFkYD8gaxILO3Zv9LklmA6FpGJH61EJGIxQu/dmuZ4jzKTZZCJuMbfcHT1rPeCSOQtDI6Z9GNXtxpuMmsZ4p7D5inDHKriQTSZH+23+Na66vq1tg29y4x6sTVQKo6Cn7AcZrF1mBsr4r8SgDbesp+gP861LfxX4xVC8OqbcDoUX/AArlNvtTwWAxVqqB0X/Cb+M3yr6ooPvGnP8A47QvjXxlG/zXkcoHbYv+Fc1tpyjBzR7YDrZ/HOuSIDc6dBKD6jr+lWYfGNs8e278JwS56tuYfyNcbvbOc0hJLbjT9sgO5/4TDQ4wEPg6FgPVm/xpjeI9LuR5lr4RgjUdyzY/nXGDHpS8Y6VTmmB1j6t4bliIv9Hhtie6k4FUJ28APgSSSRxHq69M+3NYJ56imHjis3OxLkbhsfhk6/NqlwjDsAMfzpg0n4aSjH9r3an1AH+NYgAzmpQ+Bik6gudFv/hH/AokJbV7l07Z/wDrGrH/AAjnhAjdb6kxQ8fMTnNZfBprLGeGGcVzRWo3M1G8C6a13ZXtnfLJ9mkEmGPVh0Fbfxc1Pwr49vNP1TxlAbmTQ2Qi2Q4jDKer4Iz+Oa40R239z9a4nx6bbRvDF7qUMfJdXk91UgkE/hXv5bV5WJK59z6L+0b4dt9PstLhhWwghiUKFGFVAP8ACvAPiF+334Dl8a2nwu8Px/2rBqWYrq4BwIW6YyCK+fbHxra65qFj4T8QW32eLXrCOfT5uqNCqgshYZAIDLgHk1+c3xz8Fal8J/G8WoSBrjTLp2ltJB1iYHkEj1Oa+ixMk4aByH68al4A8RRXEk1m8Uts7ZRix3EH17VlP4T8Q26mS4tWkX/pnzXJ/CXxfF45+FWi+LEuHSS5hUyRg5ZJMcbh9cV3Tan4sgjUrf8AUAmvicZS5ZFKKMc6LrZTdFpc7L0zgf41AdF8QH/mEXJ+ir/jW5/bvi9MbNV2Z9jU/wDb/jq1lDDX9wb+HGMV5b12H7M5o6Lrn8Wl3KfVR/jTf7N1CPAltnT6iu6j1/xleSCBL5p5W6LsbJH0rtrPQ/iRLZNqMth9ot4xuIMZyRXVSwXMrkuJ4S8bR/fUj8KiSaBT85x+Ferf8JXOJXWbw9DK6HBDjaR+Zpp8UWGdx8Kwlh1yVx/OlKgtiDzAzWp6Mfyp6BW+7zXqC+LdLkUibw3DDnsuD/WprfW/DUu9LnR1hDjG4YyM9xUOkkB5XsOcUvltXp32H4eyczXdxFn+6Cf/AGWoZNM+HHRNQuzn2I/9kqfZAecBSOtKPSvQf7A+HMv/ADGLtPqD/wDEVCfDHg+Xiy1mZT/t5/8Aiap0OwrnBFznil313cXgKW7DPp2qwvGp/wCWjAH9SKnj+G+sO4RdQs8n1Yf/ABVQ6DDmPPCwpd9elv8ACvxL/De6ef8Atov/AMXWZP8ADjxDCf3txbH/AHGH/wAVSdBodz//1PZ/LUd6kCDFM4J5cKfenYjIOJgSPTNfHKnLsc9kN4BxUymNfvVVSG8nP+jwPMP9kVej0PxBcuI4dLuHY+i1XsZBZCebb92Apu+I/dbIrasvh74v1C4Fuukzxse7gAfoa9Dsf2efiNdqHigjiH+2TWscHKQ0eR71xxSeY2cBCfoK9/tv2bPH8kqJcNbohPzEFs/yrvrb9le22eZrGrsijr5f/wCqr/s6Rskj5BbcDuZSPrVSWeMH/XKn1OK+5rT9l7wIuHfVbmbnODjGPSu9sfgL8NLJAh037WR3Ynn9auOVPqypy0sfm39pPHlShz/snNa+m3OoytIksTtbzho5GUHowx/XrX6Yw/Cz4f2+BF4fRdvHU/41vWnhbw5YoUt9MiiQc4KjH610rKjXCYqVCXPT3PxQ8LfDb4hw/FW98WQ6LOdN8vyLc7GO4DAyWx7V6L4t+B/xv+I/gy88PaZo627XLBd04IG0MG7r+tfrvHNpEB8tXtkVeigLmq15r+mWkTM02FHXZtrq+qRhGzN6mLnVqOpPdn5p/Dj9mj46aVotpoWrW1oq2UQjDmbk7RjP3a9g0/8AZY8VXMw/tvU47SNhz5bbzn9K9V8TeLPAS3jG98TXVuWySExhf0rzS5+JngeOd47DxbeTpGO6r0/KsfcRtTwtGprUqKPyOv079kfwpHJu1LU5rvP8JBA/9Cr0XSP2efhvo+3zbEXRXkb+enr1r5kvfjHeQP5uj6/cGNehdE/wr0DTP2h7tNLji1qIySBQVlX70g7HHABNVHketjmx1KnTsqVRSPoG3+F/gGykeWz8O24Z+CRGvI/KuusPDGh28YWHSoIAvTCL/hXxnf8Ax5gupXMWsXGmgjAXYhwfxBry7Ufih4lmnll0zxFc3CSHJLBVwfbAp+3it0ctz9LTPp9lnz3htyvA6DFU5fEuiIdratAn1Yf41+Ut34x8WXM3mT6lNIc92quup3cxLz3EhY/7ZpfXI9gP1H1Xxz4V02Ayz3/2n2gO4/kDXn198avBFiC8dvqM7E4/1LFR+Oa/P6LXtWsyRaXLr9fm/nmpY/FnjQFlTUyIW6p5acj67c0vrkewrn2Nqn7T2lWQ2aZo8krZx+8yn9DXOt+0/wCJJlJtfD8e3sTL/wDYV8qSaldXBLXMm8nrwB/IVB9rdPusR7CpeOIbPp+T9pfxp/z4QRD0BB/9lFc/L+0B4zuHcNIsaN/d4Ir58e5Z+5pqE9TWFXMH0Jue1z+OLTWt15rmp3QkXJ8tC20kdOhrgLi58DXCSNcareu0hJaNmY9T0xurBjmI/wD1U2XUxaDzwill5+6v+FXSxzZLR9AfCvwf4N+HXh+fWPBVpIYtQYl3YkDJHPHNUNH15NO+IE+oRSGGKa0aN1HR2II/A12Wn63axfCvSY4mXz5VLyIOoJJFeGiRv+Egh1A8xLIu4f7IPNfR4fEJR1M5Jnp9ha2KaNrNrb+Rp32lX2McKXdznLPwfWvG7f4XeICr+Tq9gC7Fv9crH6V9C6zb6J4ls7qKx2CIwghFJBJAGfxr5e+xaRDEEiglSVSQWEjdQf8AerysfOMncWqOgk+GXi+JN63lrOF/uuDXNT+FPGMDlDpzTLnqgLZ/SrdvI0f3ZpQP94/41pR6j4ntx/oWrMkZ6KwB/oa8ST1Kucy2ieI4P9ZolyCO4jP+FKtvqxjaRtOnATg5Q12L+JfF20IdQyfXauP5Vnt4h8TiYML9SRyV2jn/AMdqPmFzmkN5EjS31s9uo7sD0qP+0LJjxOn0LV6FN42vCU+1WsdyR1BUYNVU8VaWrM0/hiCYt6kj+Ro+YczOGN3ZA5M8Y/4EKVbu0c7Y5lc+gNd5/wAJXoxP/Io2+PXe/wD8VVxfEPhOUfv/AA/FAO5UtkfrUumguzz4EGpVhlflUJFd02ofDmcDzUe1x12ZOfzNUZn+GDNltQuk9lAxR7NBzM5k20u3Ow1CY3T70bflXR+V8LpvkTVr2MnvhalXTvBP+rt9VuWzwGYLS9mg5mcsDjsR9RipQwPaumHhEXcmzTtSTyz0eY4/9BFNPw+8SbSYtQs3+jNn+Vc7RSkc5uqRTHzk81tSfDvxiY90d1aD/gR/wqmvgXxlbKZrh4blT2iyf6UnEfMZ+VzgHNPU1b/4R3xEo5065b6Bf8aYdF8R8+VpVwdvXIHH61LiyrkG/ml31C9vqsZ2z2MqH3H/ANeoN3l8zArUWYcxd308MKzvtdmOrn8qab62AyGpNMdzVyvqKQ1kC/hJwDzT5L5YgGYYFJcwjT3dqN3vWR9vB5Apft3tWkZyHc1t3vRnvWWL4dSOKmW7RxjpWjuyZalzeucUbvSqYbkmpN/IqORk8pY3etLndUOc05COauK1IJAtcR8Tiy/D/Ut/+rkIQjH3hkcV3YeJB+8OK5L4i6Pf+JvDlrounxSNA1xvlkQZAAAPJ/CvQwrNqL1OV+GXgWPxn8O9Putec2jaXcIdPYH94EU/dPQ7cAZrJ/aU0fw/pvwn13XPE9oJ3tQEty/b5eWBPvX2J8GvCWnXehXFhdK0NqkH2YMo+6zKV3jPfvXl37Yvwye2+AUXhbSd2r6ldzhYi4wWBLemOlfXUKLlDUqo9T54/Y98L3tt+zze+JfmaJ7nYmSSMEpz7da93DTkJ5p4AXHvmvoTwV4Kj8E/sz6b4NisljuFto5rg4wfM4yf0rwd3j2w7SDsXB+orxMfhDNMqy4Vg6nBX1Gf0p1+beZ0uXCMYdudmOefampPGl0W6gjpTzZ6ffMNybGUMGZiRu3DA6enWvFWF7DbPor4RWL3PhjVvFptkk1GFxDaeacBYzuycEewr7Jt7xrPw5Es08P2sw5xwFLe1fkfruna+fDEtvpniQ6VHbMctGx5XnqCDVL4d63qn9v6ZBc+MJ9ahVv3ibvlHUYJwK9/A4RqIuex9BfEzQr62uR4wmlRY76ZozFGBgOMZ6f71eXtNIpxnivZPjDLp0Wl2OlaVl45phdOQSwi5Bx174xXis0pXEkkZVH+6cda87FZfJO6AZISehpql+5pxkReCOtM3qTxXkzou+pViwJWHTH5U7zj3AP4VWyKMilyWYrIs+Yp6qKjkW3cfMn5HFRZFMckGrlawWQ1ra0/hEg+khqP7JA3RpR/20NSq/Y1YABrJsloqi0hHUyn/toatLJcKMJM4H+8adg01gazcxH/1f1r0r9m34f2Ewu5PNu2UcCUgj8sCu2svg78PdNG+DQ4Z2PXcB3r5rvf2nvGIRo4tDiiOflYt2+myuR1T9oPx/qC4iZLH2Xn+grjl7KJlfU+4LbwD4RtCGtfD1tERzkAda1510rTEWRkhtQO7DgH61+cI+LvxM877QNb6dFxx+WanT41eN5iYNVaO7RzyrgAE/kcUOpTG2focfEOix/NLq9kg95EH82rLv8A4jeC9NRmutbtfl6hZFY/oa/Ph/iTNcB47vw/ZyKTx+8/rsrm7rV/D124e58PxjnkpMScf981jOvDoF2fet5+0D8NrNCy3rXOOu1WI/PFYEn7T/w9X5EExP8Aukf+y18ZpF8L51AuzdWA/uICQff7wqtdaT8IWKyG+vZAOCq5yf8Ax/ij26sK7Ps2X9ovSbvC6PEuW4DTOEA9/mxmuB8T/Hzxzp0DyWS6fNG3RkdSw/APmvnh/DPwz1G3MMOrywhB8iynBJ7DJasuH4aRBxJpup25U/358/oaPbILs72/+PPxB1L72ptYgneRCrc9scE10K+LfEF/4Nk1GXxPdR6zJJuhtpCVieNsbiQQOce9eVj4f+JA5NrqOnrgHlphjP5V4nr/AMRfGfw88S2WmfFPT4ZvD12Wit9QgP8AEcBVHyjIYkc5r2sstNkH0n4R8d6X43u5vCmorLbaxEjvBPbnJeRDt2sQD8pJ9s1ylzrvjiw1Ke1ub+4tjHlWjkJKt7j0GKfPJ4x8L6XaatoMGl6a9380d5KVV/Lk+ZM/JycY711vi3w34rk0+01Ge4TVZpow0kkSDqfTFc2cxX2S72OBm1vVbo/6XJ5p2459KoKQDkIoJ9qtC3u7UE3drImBzlfSs19U0sZ3SEEdiMf1r46fOmHOy2WcjmgSOOhrLOqWb/6twav2zC5RY4fnmZuFHUirjKdhORIWz15ppAPaobd5naWOa3ljaNsYK9auC3nf7kTnPqMUXmPmZX2Ke1G1fSp5LS7jXc0TADviq0UibsSHFJzkg5mO2L1xQeBgVYZrZVzvFQfaLYHG4Go9owuRbOc0vlZ5q6rQsPlp2MnggUrsjmRRER9KsCI4qzGk5PylaHaJD++lVfxqXcpEax5PNVb7SIrq2aaW4MRjPAFakT27DKOH+nNUrxorize2iDfaS4AiAy5Hrj0r0MLG2pTZ7jLFbaf4X094hgNH8x9eteGX8pF07ykvGzcKDxivpbxtYrpvwp0meWH7PdYw8bfeA9a+aLYSXiNMEygGc121KrvZAke+/D9dHuvDcd7egxywuRleuOfrXg75F5dsPuGU7fpX0h8GNLjuPht4iubyMyRWxZkkxkg89PpXzRC92YpGuI9rh24Bz8vqa5q6dhSiXFYdSetTCVRxmqAliJ5OBUBvdOLYVmyOob5fyrhuTyGuZyRjPFRMc9apm8slXISRj/s5NONrrs+JLLSru5ibo0UZei4uQlIBOTT+OmBVyHw14yuFDrotxGo7yoUrUbwjraxgu0MLHs74/pRqCgc9x6UjbT14q1cWMlifLuJkdx18s7h+dU224JJ4FTJhOPUZtjUfKTzTSqnim/KeQetITgZzSuZh5Mfcc00QwnqKYXY/d5pqtIDyKVwHtFHngVH5C5p+GLU9VNZstIjEK4xWxp2oarpmDp2ptZH1XPFZTK1OVISP3iFvxpNgzoW8aeLIfl/4SOWU5yG54qI+PvGyncuuyyL3G081i/ZrMjKw8/7xp6xiP7gxRzCsbQ+IXilWzPK1yh/hKkcehzUyeNVZhu8NxTezEDn8awy8x6OPyFAM+RubP4Yp3HY6k+Ng+A/hC0YfVf8AGpT4s0qSMCfwpaQH1UAn881yrKzc7sVCz4XD8mnGaW4RR2Q1XwTeJ/pWkC3kH8SD/AVm3lr8NtThZb68u7VlI2qiMRj8FNYMe1sHFXkEYGSgP4UlUi2WdAmifCTy1WLXb5eOmxx/7LSL4c+HyyItjrF1Izf89M85/wCAiuZkEJbOwflSL5JL7lypOQAcY+lX7SII6/8A4QKwl3GDVYsZ481x37HkU+b4V62jgW+p6aoPIBkTOP8AvuuKaOzZSrQsQTn7561A2nafM250lB9RK1N1IvYDuv8AhV/ideWv7Bx/syKf/Z6in8BeIoU+VY7kjtF1/Dk1yMdpbQYMRmGOn75jWmus67bj/QNRkt2HQ5LY/Wp5kIfJ4Z8SQnE2k3b49FP+FUpNP1CL/W6Pej/tm3/xNbMPjPx/Bx/b7yD3T/69aEXxA8Zocy6j5v8AvIKakgt1ONuLx7SAxtYTqz9pUI/mBXonhfxwtl4C1PQI4YUvblmwzYDIpUAc55OaqP8AEHV5D/p9lDensWUD+hq1H46tRi6vPDFpKIRkKqqpJHOSQnNd2FkuYcdz2Lw5cp4Y+FWmyiQJNBHvZ8ZLysBjd+Iq9Y+IU8S2egSazp41sySmQuRxBsLKME8V57qNnqHinwzH4mMn2O0uVybVD+7XA9OB+lec+CdW8VX2nR6BpV4bP7PK5jIXO8bjxnt1r7jCVVyGVV6n2H42dtU8O6yQqhDANnbGPrXwFKsvlxIMjbnJr7glDWXgi6XxKGZ5omErITkDHJFfLiwfBO2t4VTXL2WUjBQgnHr/AB14uYy0Gjz+9hkisWuRMIiMAHIzTbVWM86XVyJEjZxgDPCjIr0tNA+FF8pih1W5l80fdZMgf+P0+P4a2TSNLp98scbjCh8A4Pc814kGUeofCz4L6V4q8EXviDXLNLt7lZI7aJyNvOeWH5V8KeFdL1fxz8QW+Ffwo0ptGj0+8dL688sqY15JJPHqAPav0U+HV74k8I6H/wAI6l9aXURk3RkygOBk8BcHPX1rJfVbLTfEMt18N7OC11iWUSaucBTKgGMjA/3a+wyu3KS0fQnhH4T+DdD8O2Wi3lhFqlxaRKslxKuWlfGCST615L8cvhvpWm+F5vEnheEQNZcyQrjaFwSSB+Fa+rfF3U7BA2nWCyRzYZT5h4Xvnj0rwz4l/tHaLrGnDwNo297vUkdbgqNyoRwRn15p4zD2i2yldrY8M+1Pd28U8m1d47kCoGbYeoP0qwvhvWLi3t4xpF5Kyr95IiV6k02Twv4oX92ulXKhem6M9K+Irp6lpEYmUDJNHnA8hqqS6Tq8L+Xc27xN3DDGKna3hhH76RY2HUE4rgcG9ySxHKuMsRT/ADI2P3hWXN9jlGFuUb/dYVB+7gG4Sg/Q5qXTYNms74arMT7uMgfjXOC4eVsRnd+FStbX5+ZEYfhUuDIudK0iqcEj86buY8qRj61yLre7iCeRTCt50LEfQ1yybKP/1vavNfuT+JppYNyaqbzSlvSvjpVbmPMWN3pSDlsmoNxpC5HbNHtXawcxeQKTzUwVei1mfbY4/vK35GpBqUP8Ebn/AICf8KwlU1NEaPlD+4G+tPKZ6qv5Vni+kblUI+tNN9P3Xj6UvbMehZmgjk4ZQayptBspzuO4H2dh/I1cFy55IqWOQtxiqVRsQ7TdBtVjlWLzHKrkqHY/L69a8Z+MPxE8P2ek2Oh3QS+udOfzYYycqqLg5J68Y9a+mfDN42m6X4n1GG1E00emPtcsAEy3Xn61+Os1n4k8WXUcNqBNeztscMwLSs3GF55zX61wjgITo80jhrVuVn6iC10T/hSen/Fy0mk1gG4RZbFnOyLG4HYBhs8cZOK9TvviL4juNIspNPsJtItbiNXiaVRkjpgdeOK8J+BPgu18BwaZH8Vdae2syyMullsRluxYdP8A9de//tIfG1tVfRtD8C6Wbi1tkJLiNm2kBgMEDp0rxuI6Sg24s7MK1PcxB4x8QDY8hiuW4yHXG78gOtdFaeJwuZtW0Kwyq7hvYj8Thq+VYk+MOvKlxKYrVZeSWOGXPqCwNbdl8N7q4kW68RanLO6nJRT8je2Oa+FjiW3ax6Lw8O59ueHtP+DXiPSxqfiiWyspg2PKhZ+R68571v6pP8HdEsDL4etoLt9jBp9x3wqB1AyASPoa+R7PwxobtDbwWUFkv3C/B4P0xX034T/Zw8BXVpb3c2v/AL2cDMcUoVB6jHNd9Od9LHJKnG+jPny4f4fXss93Jf3KbnPzY6/kKr/Yvh43EmuXMY7cH/4mvqS9+B91pNyYvCKW2qQqPuzMrYH0yKx7jwV43087JfBdncn1Qpj+Zq2/IlYfzPCE8F+F75Nth4gmRnHy+Z0/9BqufhXrEeTDrFs6dmfdk/kK9ikt/GFu5QfD+A7TjhQarS3PiuEfvPh1C/8AwAf4Ucy6or6su55Ynwj8VXMYa21OzkBOON/+FUj8G/GNvKpluIXj3AMU3cA9+levxeNvGukmOO0+F8bANlSI/wCL64rqtL+LPifz/LvPBMFlG5xIjbQd/qTS9nFmLpnhtv8AC/y5Cupi5dBzmIdfzou/A3gi0l8xxqgR+cMq4UDr+NfYfhH4ltqmotZ38FnpUcYyWLLwPzFTeOviJ8No7S6tpb0NeLGQhhUsrE57jI5pujHczlCx8n6fH8JLQD7ct84T26gdvrXeW/i/9nCNUtZ9On3dNzA8H868rf4hal5jQGzjvINx2q4x8ueM5pkvjaeb5G8K2rr/AMB5/Coi4EKVj295fgrqoH9jakumrjGWU5/ka3vCUPgjSbCW78Izadq95AzN9puGcOGyeMcDj6V88ReJ9K27bnwhZlF5I2Kc+tYzzfDnUZyNS0F9PiY8mBeQD9FNaxrRRXOe7eNNP+Jfjk3MEmp6QsLKFRTI2UGegxxmvK/+FH/EyCzNtY6nprjaeDI2WNYlt4V+AKOZxc6lC2cnar8/X5K1JNJ+Fs7NJpet30QxwsgcAfTKiiVWO5UZXPpTSvEdt8NPh5Z+FrGO0uLudGE67ycuSd3f1r5G1Gw0O2u7i8u9V8kyuzSJGCeo4AyCOtdLJ8NtH1iNb/Sdah8xOVaYhSD7gkVB/wAKj12eP91remhAPuh05+o8ysZzckacx515Hh9QTZX7lT0LDn+VdLpniWz0KHm2TUD23Dn+lasvwq8TR24P9pae/JHyFWb9HrIj+Hvi62lMLWDX2ehRTj8OtcsodTLnO90/46vYqiQeFLSVAMESZz/6FUd98cvEuqk29laW+iA/d8kbto7fezXnc3gzxGGkSbwxfEJzlI3wfp8tYM2iazECzeH9QgVRyXjcfzSodw5z0C58U+Nr6NorrxUHRuxVRj8krlNQjublV+1at5zDuCQf5CuUa2kf5HtJYfdlOf5Co10ZZGBFwQc9CMVDYc51VshijA84y+5qwsnUGsdbC5tYwPtIx6f5NV3N2hwh3mlYOc6HrUgArmvtWqKuRFmm/wBq3ijLBRUt2FzI6iMDdVwR57Vw39u3AOEQZ9hUg8QXoAyuKXMS2dqQinGBR8grlIdakf76Vpx6gr8sMUgubGEIqJoz2qj/AGhAn33AH1qYapY95h+dDimMtpGePWpfIc1UXVLQjEcgP4046rj5QwpcgrkroVOKcKqm7Dct1PpWfLqqRttAOaNhm2RkVVkjYkVmpqm89Kc+qJH94HJrNpDTsakaMv0qxhsViJqqseFNTf2mwIypqFTV9yuY0zE55xxTjFjiqDX74yOlNS9cnLMoH1q3SsFy+VAoLKBzURuIiMbwc+9VZpCBxSirDLJlHbijeazTIxqZZDjnmmJSLu6l5NZ7XLDpTftsijgUDuauCeM1Lg+U6bsbgaxlv5GNTG5baWfoATW1GfKyovU77XPiRYad4O0/wa8q2k2wvvJxlVAzWP4B1uz0108Q2lyJ7GzYl1XoSTkjmviL9pPz7vxL4caGRo4mt2JI4xwvavUfgFc3kvwtvbS9ZmAucxt/EQM19RhcZaJM97H6TXXxX+HPiXwXqGtPcrZRNAUSBzhw+PTn1r5TjkhubC2uYIkkyp2vgZI49K+bfjRbXUV9p/iey/dQKyxyoOFPPf35rv8A4V+JVuNP1HTro7zC6vGcdA+SRXm4zGqT5UbKkrXPXNyIqskSq3cgVLIYrgeZNuDKM/KxHSqRu42jVvWnrcRgNjiuKnF2BRGa5raeB9DfxVodzJDcQMjkyHcM4JxjnivL9B+PPxL1/UJNc0HRocLJi7LHHnKFzgc/T0rqPiPf6cPDH2e+Uvb3ICOigsSSPQZ5rX8E/Dg3Hgq/1vRyIrmNlkjjPTfgKCenavq8qq6WBxPS7PxjefErwPFr2kWT6ZIPMt7i37o5UA4yT0z618geHvDOo6Lq15ZuZXtZbiQvKcHYzOSTuP419yfCjTrvwp4Ov9M8ZZl1bUHeedoo2YGRgMgEbu49a8z8Y6Td6B4B1CQWr/Z72+R1ZlIK539R+NenmMrUyqST0MPw34y8X22nRWEfiJlWEldoRDkdiSUzXSzeNvGqSIE1U3SDkoUUf+yivLvC8VtFFJdxc/aH3c+wA/pXdCddnygZz1r4OVW7YVo2Nux8f+IY7kzX9hHdoQQVOMZ7Hsa1h8QZGHz+ErWf3LNn/wBCrhmLuc0qhx/FWPOcnMd+/jjTTCrf8InbLJ/Eik//ABVVJfE3hq/jBu/Dy2TZx8hz/NjXGbsUyU5FHOJyOm+3/DKRtt21xbeuxQf8anW2+Dcw3rqV76dB3/CuPjfbXVWOiJfqPtN9DaqwBBZlPX1GRiririSJpfDvwynH+h6tcI/YOFx/KoU8DaTdHdpuqQso6+aSPywK3B8LE1I7LPxDYNjn95Ii5/NxTJvgzcW+N2qaa5PdZYz/AOz0eyXYrlP/1/Uj5lOUuecdKsM5i6gfjTkuLUrmbK18PyszsiDcab5rqcr2q4kcNx/qjkUpsttHKxcqK4vMf6zB+oFXY9YAUIFXH+6Kz5rB5D8vFRJYTL8wXJpcoNs2mu0fkqB9BU8EtuR+8FYRhvQMeSDjvmhPOx867D6Cp5WXc6zdp392oJ5LJE3r8oHJ+lYA8w9M0rK5XJG4jkA+taRTeiBnb63Bptn8AfHXip782rCH7MuPvsMo3Az6mvyC8J3F3YNpmt6ezfatOKzRFiRkLg/N164r6x+Peuazpn2CwEjw2F6MSxA/I7cnJH4V83S+Xbspwqg9Owwa/cOGsO4YNXPKrSTmVfE/jHxv8RPF+ltrN64+03KDy0lYAAcD5hgiv1UcnS7O2s4CoMEKIxwGzxnqee9fmj8LtCh8R/EmzthEbhbSRZ2jwSCq9eR06+tffk99qDXcnkRF4mwQrfw4GMA/hXyXEktbWOqjGy0N8TvKcuxP04FTCcJ3rOs5PNXF0nkvjpz/APXqyYe4PFfn7smazlO25MX3fMavwaheW+0295NbspBBRjgY9sgViMrKeDT0bPB61pGqRrY7qHxV4ht42NlrNxDIeSwyM/8Aj1OPjzx8p48R3H+fxrji2BkVXaQit/alxv3O8HxB8e/9DBMfw/8Ar0f8LA8dNw2vSn8P/r1wHn0omzR7Yq3megL478ZEnf4hmVT2A6H161RuNZ129y8+rSTFuSSoBP1INcaWq3E77eD0qZViHJlmW280l55HZu+HIz+VR+TbIAY0Jxx8x3fzqFpZSx3GlVuKzliGwTvuL5cZO7GD7U8FgeGOKgaTBHekMvPHSuN1NdymkXBKi9ZG/Kle52jKY59RmqwvUQbSuarzShxlafOxWRN9tlAIURf8CAH9KoSSedJukCZ9FxioztH3l3VHuQH5RimpsZbMkSL8449AcfyqkZtMEm5YJA57iZx/KkkjMuVU1GmlSMc7hVe1Y2zXtHukbzLOVoV92Lfqa6iHxZ4rtBi21uSA4wMIGx+ZrgpLSSJtpb8jUyQNj7xqvaMzauz0hPiH42AA/wCEjkYj1ULn9a0V+Jvjc4E80V9H3D8Z+pwa8ckhlRgQ3X1o3XadQD+dP2r7ise0r8StZxiTQLCX64J/9AqrP8Rdv/Hx4WsQT3XH/wARXkQu54/vID+JqVdYWM5MIyPr/jR7XzEepQ+ONB1CaNNS0KGEKeXTpj34FWZoPgpdsJdRvbu3briIcf8AoYrySbXNPkHz8MPanx61G64jJUfQf1rSOIitxnqj6L8EJyBZavfhj6gkf+jKE8FfC2T/AFWtyoe3mqB/NzXmSahAARJcYJ7YH+FO3WUvWQOKieJh2Cx6QfhvFckrpGraeR2MrhePfg1APhP4nGT/AGhpLr22TZJ/8crzkwWkhKov5sw/rVqFfsuApxj+6zf1NR9Zj2HynXXXwo8S79nmWrnGcxtkfntrnrn4a+NYlLQ6bLcAf88lLE1PHrWpQrshupEH1/xq/H428XWQzb6rOg9gp/8AZaOdMtxRzR+HvjBUL3egXpX1MRAH61lyeENThYtc6XLBF2Z8ivQrf4g+OJZMnWbjaOoZUwf/AB2t1fidr9tHiVUv29JAB/LFawhF9Rcp4imn6erbGnjhY9t5Jqyumwkfu7tX+hr3yL4tmZQs/grTWb+8S2f/AEOp5fiPYuF8zwrZQKepQtx/4+aUooFFHhUFpIp2Bt2Kuixc/wDLLd716xLrnw2uvn1PT3t3fqy/0xmqQPwUdtz3d8p9FA/qtQ6V+ozzCWxkA/1WB7UkdmHXMkDGvXoNC+DN+d0eo30Z9GA/+JqQ/D/wXfE/2NrawqfumUkH8eKf1diPGHtQOI4SD9aqmC66BTXuUHwuuslrfxBYyqehckf0FVLj4Q+JijSQ69YNjoATzS9gxnjIs9Sk4WJce7Ef0qRdIlUbpyE+jE12uo/C/wAapn7PdxTY/wCeXf8AOsK68EeL7K3DS6Vd3bn+JCuP5iplBoRhOsUJ+8OKnWUOODmqM3hnxRy0ui3aqOp+Xj9apytdWSCOS3ljxwdyn+lZJMls28mlEu0EVzrXkvkblcgfQ5rNjlubglkm2keoNHKyTq5GZulRfvf4nyPTFYCDVlPFzDt/2s1pWxvPMAuZYmXH8Oc/rxQaGmhwcmrS3sKjZJ0NUftUMXDEGtKw1NL+cafY6O15ORxt6n9RWsIsaZ5t8QvhZrnxeEE3hAL5+lABy3ACd+gPYV0HgPQJ/BnhweG9QCm7ViX284OT/OvqH4aaRrXhBtV1HUoo7FZbYOLecjdgqT2OK8T8R3p1bxHcTFkh+0kbSDwABjtXpUouxZyHjPQl8TeELvRnH73f5seOu5SCAPriuU+HXhLxToCPqfirT5LG2ukVUdlwDsGAe2c5r3e1+GniLUbOOfStTt7h4sOEUkyHac89s19PePPDuqeJPg3p0rRql/Y7FIkAViQORx24rT2EXqW5aHyOJbdikMZ3Njj3qKf7SgBW33FyAASQeTiqer+HfE9o2+7t1tVK8MhBP16mtP4dafbDxZpcmtXXm2rTIz+YfQjHSs6kbGSn2Ox+JvwautP8P6BqMV4WmuvLnaFgMAYBx39a9D+HvgfxJP4F8QaVpf7q+ldBFv6Y+QkjrVz9onWf7Z8TaRomjXQayCBYwn3Q3y45xnivcdAtJvhx4FtF164a5u513NJwCAeg4A7V9FlFJ3IqTG2sul+CvC9qnipEnntlH2hlAJMn14714P8AGjX5fiXoVjp/hK2b7FJOqy+WgGMZGePSvpXwXceHvGnn3AhW6t0PRuTkevNbV0bCDVn0+ztY4U8hwFAGB05+te3mNNOPJ2HQq63Py+u9BvdAC6bHl3j6nvVaJ9SVxuU/Q13nidon1nUxE5EiylT+nNc6iAAMWya/Pq9HlkzetK5atb6wQBdRkeNweVUZ4+uRXSQ6l8OTGBdSXYl7lU4/9CrmEkKHp+OKe10z8MoI+lchzcrOmlm+Frxu0N7fCbB2gpxnt/HXHOzOzfYQZIuxbg1a+1S4wMAfQU1Zm/iNDFysjTzAPnGKbsgBJeMuW9WNT793WnALVJmkUZ81hpc67ZInRvVZGH6CmjTrcKFjkmAH/TVv8a0HC1CpxVcw9D//0PdlT4JX8ga41PVEk9Dvx+e2t638L+EdTi8vQNaVVPa7cdP+BFa83fSrWQY2AZqq+k2UK4aEuPUMR/Kvjvao5z2pPhuLePGma9p+T1y6D/2es+fwJ4jyPs91b3hGTmBgc/kTXjBh09G2rbyf9/X/AMauWt9qtiwOlXMtoo7By38zR7WIHey+H/FUTFP7GvWI7gNg/T5aqnTfFMJzLol7tHco5H/oNY7eM/HTYH9uTgL7f/XrXg+JvjmzQK+ptOB1VkHP40e1iFyrLLOhxcxtbn0cEH9cU1GtXOPOTd6bhmtMfGDV0fNzodre+8n/AOyaSX4r6XfFItV8KW0UXRngY7x+G0VMpxsUmRCGOMeYsqfmDU/2ePyPtBIcE42g8nPoKil8UfCnaoure7t+MjGT/Nq6rwRe/CXxB4q0PTrC9uUuLq5VFikX5TzjP3jXqZVBORVZ6HW+M/2OdN+KngywvLm+ktb8YkiTdtAXnivJ1/4JtW+pxRtq2umPZwFVuR+Oa/TTxNrVtpFxaaaMR7Yxs7ZxxXmGq+Nrm1lLIN4+tfqOBxVZUrRaSPIlFc+p8geCf2N3+A3imXxBZalHfabqEBgkMg3PGWx/Fu6celQa5YvpF39glQhocgFlK5BOcjPbmvqrUPFq6tZ/ZJRueYgBCcjPqa8l8Z6Dq2qpJpuqIR4os0BSGMDy54CeGVuDkZPbtXy2fRlJO+56VBq2h4wrbuRQVzmp7rw34y0xFY6DePnqfLG3881DILi0hEmp28to3TEi4H86+AqUJGkyhMpGaqoCDmpZNV0offuFH1NV/wC0tJkOI7lM/WpjCXYi6LZJK4qrIp5q0iSyjMEZkB7r0qX7JeA5a3bH0rWzDmM1IHkUsrDC9cnB/Co8lTxzWhcQoQC9vJGR1I5z+tUjLZpwWI/3hilZiuLvY1eUgJk1HDFFcLuhcEe1TPZybeGH51lOLC5FvDHk4p6sp4Dj86qmwnIwpyaqSaVqv/LNRj61zzi7AapjfruX/voVXLnOAhx7cisaXRtdI9PxNUPsHieEYS4KL6BQf51hZhc6gjPUHNVy6A4LAfWsIJrqriZzIfXGKqul7KdkyMPftWtyrnTma2A+aZfzoB0+T714I29q5RbW2iOZkP8A30anV7EcqB/OqUgOqaxRlzDeMfwNVzp94AW+0tgVgnUIkHzSFR7HFJHrNmjcysfY1adxGriYcK5c+9SJaaxPzHhR61UHiHTD1Uj3pf8AhLdPgGEZiewFZyZcbEraPq4YO82QDzmlmgvOFAJx7VRPjzd921dwParcfjzC4Wy+b3FYSn5iqJWGeRdNwVOfpQLOXPKk1bHjGKZebba30qSPX4JT+8XbmpTfc5tCsumRucOMVbj0S3fjOPxqGfVLUnMZzVX+1E7EitFI0TRpP4Z0+Q7pOTT4tCtrZg8UpXHbNZX9qr/eP51q2rC4jDq2acmmWmiSU/P1zjvUPmc5Jq19klboRiq0+mgnLvj6Glctj/7Rki4WBJPqRTWv7uQfuyICewOR+lVPssCckkgdeaZ/oaHdzW0Z2JaLTXN4eGff9aiLyP8Ae4pDqNkmBjpSi/glOIxk1SqAOVCeeSTVtbWUkEMVyfWoluFt2V7hkihyAWJ6Zre07Q/FGrvdXljp7HSbPlrlshT6Y/Kumnh5z2MpMaloY1DNc7fxqjcQahJcC2sZzNKzBQsYLkljgdKz7y+n8gwyWkyNu2l8cY9ua3fB3irTPA8OveIzEJ7mysh5AkPCyMSAx69Cc17OXZe5z5ZCci3d+FfF2i711e5ijlADCN2ClQem4E8VxN3drK7K0CTyIcFwu5R+NaHwq+KEPjXQb7TPF90lx4ju7kXavMAPOjUkiNfQYIHAqHxpqjPPb3XheHzWE4gnt4kBX7pJYn2r6PG8PJU7pihIovBJLGEntS49B8oq3Cs8a4QyW+OnzVLNpviQSgrMAjgEBhjrSLp+qxNvuZAwr4SvBwlY2Gt4m8SaUdlhqtwgHGAx4+lbdr46+IWUij8T3kQlBI3I+AFGTznisxYlVwzqDgjqK7tfHX2eJIxpVvL5ePvY5/SsbvuBiR/EnxpaZiGuyXRPUsG/xoPxH1qIb7zToL8N13lRn8810q/E5drRHwvZNu/i4BH/AI5Wfqmt6frMSudKhs277Dn+gqoxb2lYUjK/4TtrgceF9Oz/ALRjNV5tfS/YLeaHZW0YHPkhefriqUkOmE8gA1VaOAHENXytbu5JuRW/ge8+S/s/KXuVXGP0qSPRvhA2V8+9Qj+4Gx/6DWRHavIATIAD14r0jwf8MdT8QXo8m8S3sVXzJLgopCRjk5yOuK3pYeU37qNDlbbw58EV3Nc6lqSSHsQ/H/jtbmj+F/CNlIdX8EeJ7i0uDwsk8hR1/BsHFY/jjV/hB4YuSdC1VtQuI5BC7so2Fu56kDBFczOlm87SGMSq3Ksp2gg/SvT+ruC95EOR2useAfEPizUJ7y+8dxzySRrGVZxsYKMDIL1zUfwG8Xxoiw+JNMmjbOEWWMnr0A8zmszybJh8tuV+kjD+VV8Q25BgVo8H5SHbI/GuadeBpGR6D4T8C/FDwHeSXnh61gvJ5OrbhgeuBmq3i6T4+6herJfR6gY+0EQcx8+wBrlk8U+I7Rs2uqTR/Rif61oW/wAR/HVvkjXpQexb5sD8amM0xSZyv2D4kmSQ6nZXyo/USK+P1FYT3dzZ3f2aUOsgO0qMjbn1r2C1+JnjLzBIb2K5HdZcHd+hxW8PirKse2+8M6dI5+9LxlvfOyt4SRlFHI+B7q21bxxoenX1zJem3ni3RkHaqEjPPINfU3xa8bWOpQ/2LAxR4gFwRhcDoM9K4DwB44sdd8SWun2+gWdq8vPmxgbxjHOdoPFcD8Rr+MS3STTYlklKr7n619dlTW5hLQ9b/Zr8QNbeJNf0naFgHzYyPvHd09elfRdtG11qr3zQlThkyRg4z/8AWr5B+B+o+GtBkeCwS4k8QXa7GMgyhJ43DLH144r7G0O11S0Ihu3e5mYbmGACPWvWryi22EWfnNrFxZJ4t1q2ctlJjnjvx/Ssya9s4f4GI9hXr+ufDmO68Uaxfafq1tumlJdZjt2NgfLwD2rDn+E/iCQF7fXdNX28zP8A7JXxmYRV3ZHZA83S+il5SJgPcYo89Oyk1vaj8NvH9oD9kuLe/wAnAEPJ+v3RxXNv4M+JkDFP7FuLkd/LTivnKkWjQlJQ8g04Y7EVUl8OeP7dA0vhu7HH9z/69Zslt4vi4bQ7lT7r/wDXrO7A3xgd6a0m3nIri7m/1G1bbeRNbv3Vhgimf2yjjDSDNJpvZENHY+cpPzGmtKg6GuXhlubj/VAse2Ksmy1U8lSPrWTjNdCD/9H3RraIEA9acbRSOmRXKjVL+T5oYWkYexq0NR8QFMpZk/Uf/Wr4K5zm79hj/uiopbKLaflANYb6t4gUASWeAepx0pfPM+HkuvIx1Vhii4yaSxJ+7jFQ/wBlTt2/UVL9t0yMhZboMfapTf6MB/x8HPsaBGe2mlRtZyAeoGKovpoi/wBVk/Wt+O+0lj8spb6mtCG809PmAVsepFFrlR3OOFmuQZItx9xXrPwh0l7/AOKegW72/wAkEiOcADYMj5q50eILRGDLbo7ZAHSvoH9nKWLXfFmpeIjEFNvbvCMdARgf0r6PJ6NmTWmdH+0DJqNxrNl/wj1+ZZ7SEuVXpwSMZx1r5g0f4marNK0ephzJGQJB3BPHIr678WQ6ZpyXEqxE3E+cZ5wep+nSvjWO3t7nXtT1FAFE7ZJ9Tk19c8x9nHlOJ0NbnuWkeILOZRdcbx0Jql8Vp59Q8M2Pi+y1GWz1XS5wsDx43Mp4Kcg5HzE15LYX39l3xjvpP9HwTvzx9K9/8NaHa+MIEjOLmyCNsQno+0/NXmYzFqpE6KJ85Xfj/wCMctwxOtyNCGyqkKBt9OlZV18UPGCN5eoWUd9IO7Y/oRWjqWk+IY9Yv9PuJfktHMagegJArIPhudzukPNfIYmvys3kR23xK1B51F54YtpB7/8A7VdNH8TNCjK/2n4XggQYyY8kn/x41zbeH2FU5tBkYYzkelcyx89uhHId5J4x+E9/+9uRdWeeqxDp+hqP/hIPgaORqeqE/Qf/ABFeejQpFyfL6dyKYlkqjDIB+FZvFC5T1S1h8O69qCR+Gb0Qw7R/x9Njd6E9Oa6b/hANUmGIda02L/ecf418+XGmwyDDKPwrMPh/T3O4oxb60fWl2DlPoW++Gfi6Jd9rrFhd/wCzE3/165648EeO48eXYeeO5Vhg/TmvJbaPVtPH/Etmktz22sa1rbxF8R4HAg166iT03Nj+dW6qaDlPSF8K+KIoQ9zotyGB52YPHr1NVrgyac2y5hnhOM5kU4/QVRt/iV8RtPVSuvTuQMEZYf1rRi+L3iJvl1W0j1XfwxmI4+mc0JxaGkZ39tWZ489T/wABapYtWtCcIwc+yt/WtgfGKC2HlDwbpjgfxeWm4n34rQT4ueEbuMJqfhu3tM8O0KqOPwFLlj3HYwvt8JGQgGe9SvfWzQkXMgCEe3Src/iX4G3pzcy3sA9I92B+AFZ8sHwP1e8htNM1HUdkxCuWD4GfWmqcX1Ag8rSJOiqw9TTJNPsCD5USiuln8FeGtkcGieJLWFUOSt2yn6Y3MMUkXhHVnBaLxJpDnvteP/4utPqgHDtZWxyVQNj0qm0NspxsWvRLn4aeN7LEtpLZ6jFJ8x+ylSRnnOFJqMeCdYRV87w/eSTH7zIG2n/x2sXSa6AcB9mtpE5QVWk02IKTHGC3aux1PSNQ0qMyXOjz28Y7yI38yBXIyapAc4YRnsHO3+dYygMzzbasg/d2y7PX/JqPy7hAN/X6V1EGswNbhZbiIlR0DioRrml52vH5nuKy5UE9jl2kZQSetVWnYH/VE13QvtEcZNqT9F/+tT0vdNz+6s2UerLgfyo5EYOJwYNzIMpC2KQw3G3JUqa799QgIwka0uy3lBaRkUEd8H9KtUDWNM88WG5dtsTLu9Cwq0LbVkTIZQo7hh/jXpNj4b+E8souNba6E56mEkD8gK2h4P8Ag7co8cd5fx+Z0GXwAOnFJ0Wy3TPFRPeyAoJzkehoKagmGMrGvZpPhN4feFpNI16KI9VEzgfmC1cNqXhHUbF2DajHMAcfu+QfyJqHhpCehy4uZ1PLk1P9sv3wkRUbzjLdPrW0vhx41DyOPpSpbWhUxypnHStI0u4jrNL+GOqahElyniLT4jIM7H3Z+ldCPhD4nEXnw6xp8y+ibu3vmvOETQLbBubQO3rx/hWjDqdhDGI7S6ltoyfuIxA/St48qdgOktdLk8HXMet+MrNLrTYN2+PIwxIwvf1xV748/En/AIR74d+GPDfh+5FiNelN3KiEAiNtrRofYAkV5T48tNZ8ceGp9E0O8nurm3IdYySScEHj1rxr44eCvHWqJ4GFtZTX5Fh5EwhBaVZERAdwAJXB9a+7yDCp9DmqM+n5NMtxqOjQCdrv+0IFCd1aQjtjuORXp+p/B7UNA8B6nq/inTUm0q4T/SR0nVONu3nHB55FfAPhbUfjd4etRDNBJaWmizxeVLd7vOQHGfKDYIPJ6V9n/tZ/tOW3/CM23wv0C/dL1oBJqE4z8qgZxn1yPWvrKeXNVI8q9QTTTPkzxFonwe0fWNH1/wAPajeoqfJPC4wxTjG3CAHAqX9mqbVLz4t67p9hK7aE372Wabloh8uCO2eg6d6+YLfxs+qMlveak0ktojPanYR8p6ZOep4r7e+DngzxB4R8Aj4uu6z6Zr0nkSxBvnIH8QHPdPSuvPKsaVBoKUbs9Y8QeIJ73VXEESLa2+UiwCDj3rnvMupDuLdai1m4v4bhj5JZZPmBA9axo7zU2bKwt+Rr8Rxte82digdF+8J+anDI5NQ2txczri5h8oL3Pc1PuGMHrWCZLJN2OlMeUkYzUTuBTAxkO0d60hcTInTuTT0Q8bec9MU8W0zTPbsMt0CbNxZuwAr6k+Hfws0v4e6MfGfxDjOoXtwoktNNUeYzA8gCPkk46jFeph8BOb2JSPmexNnObmxnu3s7sIXhIH3iP4QSCM8VkfE7xDe+EPhFYaCt3dW1z4ikE9zMxXdtTDeXlR0bJHFfpZJ4Y+FeseG49e8Q6HbaJCAZAJVWFhx1O4Dmvye/aJ8afD3V/EKaH4ZvLm80mBmy85LRxue0RPGOO1fecOZPeTutjOrOyJ9G8ceGvEvw/OiQabBDqWmkLKshwZ0OSGHOc4xXR+G5QNHEJBZVbhm6j2z3r4MTwvf+K9QtYdF1Z7XWJboQxsjYKwZJw2D0IAr9D7q3kQWem2qiO20+JUJH/LRu5P51nxVCNBaEU3zEJmUDiqssqsMY6U5rKbeSe9ILVhya/LHiXN7HYqZTzu7Uxo2A4FXBbkHjrS4C4D8ZOKuFWTepEkY0vJ2uOtWdL0K+13U4dH0pC9xcEAAZOAe59h1qVIU1C8ayska5m6ARjJzjPal8K+P3+GniPU11uCSLUZbIxWq7SGUkONxPY819Vk2UvESVjnnUsetX/gvRfhgba4u9fa48RxsrRC3I2J3KNkHvjv2rxXxl41NhdRf25bmO5u/mRnBw5zjIxXE6p8QdHa2/tvUN89tHMhuXjB84Pzu3YycZzXa+OPEfg/x3ZW15cRSNaWdshhuo23eWPMGQwA9z3r9H/sj2ENUYwlzGxaeKksBa3lpO/nwSq+xB6EHJ4r7U0n9pbwUmjpqPiZhbzwwAJGoYPIygA4B5OTXa/Cv4d/CGz8Dab4pg0+O9TULVJPNuEDbwRnIBHGc14X+0/wDCDwvqnhO3+LfhW1FleaJJgxKu2MwjO4hRgZ+UV8vja8tbI64QR4f4o17T/Efiy+8QWVr5Nte8x4YjcOOSM9c1y8iWPm7tjqQeoc/41ytjfXN4kX2dWMko4+U4/OrF219b/JICZB1A5r5XE1pNu5pKyO6tNbvrBg1nezRY4GCP61uxeO/GCYEGsTIo7Db/AIV5DHdXRGSjD6g0puL9vkjz83evL5pSdhc57L/wnvjU8DV5HZjwDsz/ACq3D8UPFlsfLlCXDDruK5/HBry7wv4Ou9bvJ9V1q+Om6TYDc9wW2ruHYHI9K6KHwt4a1PRtY8S+HdSeSLTjhppOkrkZGCTzXfTyyrJXSM/rCO+g+Ll+vy3/AIctLvPVnxn/ANCFaafFrSiu2fwTZc/xr1H/AI/XylFfXVxLLFexlZojhkHP4iti3vZY0BjOB6EVyV5VaAvb3PoZfHPwtnlZr3S5reZuXWIcD6ZzUb+IPgNMcz/b0bv0/wDia8CfVblQWDgDucVRk1RXwXdX+tFPHVWL2p//0voNLDVGJ8meCH8v8KhuNF1iZdsmpIB/sAf4VSJtD1Q/nVd9g/1PmD6EV8GTyokbw3qBwWvWeq8vhMTczksR3q1FLdx8pIf+Bc/yqY6jqCDJkRvbBosLlRmx+FLFeCoP1Jp3/CJWWSflGferr6xcBclFNQpfzMMlQx9KTsFkMXwnYY+ZsY9DVabwrphOTK4A7A9f1rSF2TyRtPpUqyljihNGkKVzFbw9LOyw6SvLfLlj0z0Nfa/wKt/DfhLwRf2NhdpLrLsWuFbG4dc4r5A1HV00K1a688RbUZ2OQPlUZP6V5T8PtR8YeK/FEvim2v5dO02AsqhT/r1z3Hvivcy/FRhubTwtlc+qfjP4k1S+QDRpdoL4Zl67e9eFG7ZD8owMc/WunlW+M0zTuWWTpms46YGHzjP0qcfmHM9Dn9mkjFnug8QWQ8EgkYB/Dmup0/8AaM8ReHLO40vwxpkCmzTa0r4HJ644PY1Uj022R1JU4HWvm/4nr/wjXitobd3NrqMe+MgHbn+6T+FcccXJI1wuHT3PfLbxRda1ajXpJA9xeNumA6Ank1P/AG06tkiuC8AaLNqfgtLpZfKdZcEDtyOK6qTwbduRtuSK4a8pS1sFahy7GkfEJHSMGof+EjQ8GHB9azG8F6kBxdVWfw1rtmcwlJR7n/69c2pzWZ0UXiOBciePKn2qhJqOkzP8jMHPQEcViGHXekkCAL3H/wCumm4vY/lktVelcTuaToshwpA+tQNZ32f3EkP4k/4UyDVWVtslioA9R/8AXrTj1OFh8tuqn2osIhg0zU3AMkke70B4/lVw6ZqpG0PH/n8Kqy3W987ih9qm+1QhB5rkH1pczAqz6Tffx4Y+1UXsp4ly8ZxXWaHpz+IbprCwujBKRkMSB/OuwvfB/i7Roi0Fi2srGAD5bKc1rBNgeIPEC2EBxnuOartZEqSy8V6pLZeKyplbwTcD3BXj9a5m6vQQ8V3p32SVeqORkfkavkEcT9khA3eUB+FQu5Q5jAXH93g/pXVQ6poCp5F7b4kzzjpQbbwxcHfHOY89j/8AqqWrDOGh8P6rq1y/2LS578AZzGxJz7jIqd/BXiexQ3TaHcWsK/eLuwP5AmvUtI1Wz0Vium6q1szYyVxk47ciu/tviTqCxlFuI9Tc5HlzDgj3PAqlJ9wPnS21LXdPU/ZdZuNNI9GY4/Or8PxC+ItkVNv4qmucHgbRX0HD8RdUW2dbnwtp8m7PzdcD/vuvNdd87Xrz7RDZw2WfvJEMA/mTT530YGPJ8XfHtzgXjpcqBjDjOf0rRi+Lur/L9s0Cxudv95QM/ktchNYXkDlZI8sDxgdqg8i/z8tsGHqRWblLuFj0H/hcURBW88LWUUXdk5IH/fIpI/G/wk1BfNvrO6hlbqIl+UfT5hXG28F6cbrRcf596047cY5iVT7Ci7Bo3BdfBWY5S51KNj7f/Z1qWmk/Du8dVsNZnt3f7nnng/qa4m6tz5Z2KM47CuTuLKbeSUPNHNYTifQY8ESyxg6f4k00EkgJK2G/RDUD+BvEdhatNc6pp14y84gYsx56YKivnhNIjMwm8vEnrk/41oxQ3cEglt5midejA9PzrqjXj2Hqe5v4Z8XxQJOmjSXQfp5aj/61ZN3pni62BeXw/dRqOvyj/GuEt/FHji1/49teuI8dgR/hWlH8QviLBL5p1ea8K/wPtwf0FawnTluWmxXW2kkL6hazxEdQ7Mv8jUwvdKUCNNSFuOio2Tk+mTzRH8Z/G9mQLrRbW+HcyDk/+PCult/jBBeRr/afhGyU9yqnI/8AHq2UaXRiauYtsJ5SVjk8z6H/ABq0bOYcbeasy+PfhZcsW1SxuLdv7sAPX/vk1nR678G9QJ2z6nbB+RIei+2Nmaxly7JkItizXOJ1BPoaqT3Wh6Tme+CqPer58OfD3VIN+l+IGhRRy8xIJ/QVx3xQ+A3iiP8A4RKew1WR9M126WHzEGVAO775wQBxXr5VgI1JrmFN2RZg+KvguK7jSaC4S1XIkktgN+CMZzkfzrzPxr42+E+kR3OoeD/EOqxXs2GZXYvsY9Su5z17jpXra/sjeOr34hXvgbw5rKQ2VlaLI9wwziQk4BHvwK+RfjF4b8S/C/xTP4H8TCOe6sl8wuqFQyv3BPB6V+x5PgMMoqKlrY5Hc6nSPihd3EV7cTXsuqpqKBYY7gBCCoAyuM5ORXzB468UXt14jur7UVdZiVVkYkswz0565r0vwdfaPrXiTRdI1a5FnYyXKwyTdGj3qWAX6/Q179+09+yzonhEeBvFPh29utQS61G1tppnIJYmRc/KFB53YOR0qcdUhSdkzupU9NT3L4Wfs5aRrXwgPjG70CXGr28YRfLHmIAh+Yc8dfWvnzwB4v8AHMPia8+B5jeTwnpk5kSbJ3W7ddpHrye9fuTpbXfg/wAA6bbWluot7HT0yOOCsY6ivy6059Ou9b1q8h8qKa+unlmbGGcj5Rn8BX53m+KnNbluKLGoapDEVhLu4QYBKim2upQ5GGfn/ZFbU2103y7TjjJIB/KhAEXcABXwdem3K5SZUll83k5/GqjSYOAK1mYNkHnFVpI424GBUwpN6GM7oyHkz2pryiBBcT5jRTkkdq37LS57m7trK2iM1xdOESNeW5716H4p/Z3+M4u7WDRWtpLUx7iWGMluzZYcj2r7LhrJ4Sqr270OSrJtaHn3h34z3XgZZpdB0a31ma4bcJ7sY2AHJI4bkdq9Nb9rdotIYzaMtx4iKMLadhujQk9geBg4A4rkv+GOPjHqCCW81a0iMgxtCkhSfo1fJ/x28GfEL4Cxix8Q27TwPwL2MYhBPIySTX7tg8oyacFCEk5epwSlWjqzK+Kvx68Z67qEtz4v1d5JrfOLS3YiPnplRtHf0r5vkn8cePtIvtc0nTJriC0Y5WFBtUrngdM/jXLaxfx6jbLqcTK07KQ0g7jk45r66/Ye8RXWp6Lq+l/IbeGUt5ZGQzZPJrzM6xlLCw/dI78HhpVNWeefszWVh8QvilDpmqyf2NFYwE3X/PRXGOueh/Gvs/T7rzbdo4wxjjJVWb+IA4zmvm74zeDtWh+Nmha34ARtPvLpsX7wL8jRDGQf0r6RtrzT0t0sYlaKGBf171+QZxmP1hu56dTC8i0NFPu9c0pjLc+lLp0GuaxZTX+g6ZJfQWzbGMaknPv+VWZdC8ezqEg0CcFh1K4rnynhh1pX6HDPE8pmQR2s7bZ5xCNwBJ96+mfDfwO8E3ttY65qXiKPyAFklXcOnBxXxb4l0bxZpHz63pFzbwkffCEgfXANeC6vqD+a5s9auNgP+rV/lHsRiv13L/DGlKlzOa/M8+pj9dT9APHv7Unwv+F2sP4V+FPh631e7Rv3s7AMAwGMhjk18VfFL4q3HiLWT4k1RYobq8ZRtVRiIk9M45HNeQaxqSSaZdC1ULIyFS3f1619wfsi+Dvhj8a/AWmaJqWlrNqWnNJFeM5AcrtABwffOK9irkmGy6nzwWxmpyquyPmrwvYzeL7v/hEtFRZtR1dvkVRlZHPA7e/FbH7Png3VNP8AGfifwn4lWaWO0UR3Vu4+7KXUhQOg+Ug8V9X6z8IdV/ZV8aS6n4ZEMvhHXmaMalcDc+lSueGyCPlGSehxiqXhex0P4jfFe/t/BGotBawWu7UNQiXC3V3wVYEjkAbR+FfO47N41Ivl2Oylh3Hc+9NEs/C+k+DdI+2T/wBnWej2axtbOcYWNeB1/CnaL4u0T4g6BfWWtWqWeg3RNtArD/Wjlcj3OK/HX4m3Hxbj8RXGk+KfEctzFb3PlxRpwJlLAY9/wr7e+E3xFs/FE2ifCK5kKXemol2zqRuQLj5T/wB9fpXx/wBXdSWh2zairo+l5/2XfhvcjzIFlhHl7UCMwAyc54aueb9k3wxHpnkRX0r3YbIkf+76da+lINVs4bUXklxtt4Y/mLnHA714v4h/aZ+GujPJAZmvNhIPlAkcfhWVPKqtVtQhcj2sLanKS/sraCYlVbtmbAznjn8K8D+KfwLufh7bjWoLuN7bJBiyS23HXp6+9fT/AIA+NGhfEybVX0S8WCS2KJBbyHaxYr15xxXrh0e18YaH9l8X2CbxlXU8ge4OSOlKplKoSTqRsSrSXun51XPw58R+NPhFFpfgW7t7uR3Nzc2xbEki8MEHH8XI618h6B8btD+Gp1zwN4202ax024lWOSMrl4pUG0gZPQnJzmvtf9pTwH8P/hnpJ8Q+CfEMuia2skQSC2lU7sN3XBr81/Heq/EH4kaMmgyrbPM9yshuMYmkxkfOc4xzzwK+1yzLoypcyXuv5HmVm4u3U+mNSMuqX9n4itbb7NpN0mIp8ffBB605tGi3GYyAxLglh0rrPDOk6tpehaT8PbO7PijVIrcGYR4aKDOeRt7/AI1bn8F+JdIVtO1qwlsbO5ID3Uw/dRr/AHuOR1r4XPMvUqvKjaF+osHw28H6LoUfi34haq1nFfqxtbOI5llIOOASOOD3q+fgx4O8S+F7DxR4avbgQXLshTGWBAzzyaoftDfDfxtcy6L4g0y3TxFomk2WI3tDuMZOCWwCTnr2rxf4XftKTfDK2uLbV4HudPuMeUh6pIp5yD7V7+A4SoyoKfUfPqf/0/bfIb/nm35VItsQMkEfhXtH/Cr7yQkW/inTpD2UMcn/AMcrkb/wJ4wjlaGyhXUgvG6EjH64r4t0GYHBSjAxmqLI7cLXXP4P8eRsTP4duFUdT8v/AMVWS0NxYs66laS27dgy/wCGazlSaBmQtpIfvPxSmEg43bfer639q2VaVE9AQ2f5UP5Mowkisfb/AOvUzpXLjsZ52RqxL5wK7H4e+G5fHGsLp9uxEGcPIozs9zXGXNlLHGzvwDX3b8Iovhv4P8HR3GmXCSXd8uZFY/MH/wAiuzC4NPc3oTsfnp8YvhL4l0v4hR+HNSuz/YQXzlkBwZAMnZ7g4x+NOtdVh0aNbHS4FhijAVFXgAD6V7b8XdM1O48Vv4j8Q3LrbN8lumPk2k+v415ZdW8WD9ngEg7H1FKth7bHRPEtqxkTavfTqTJKc1Qh1XUkk4lAHvSyKSxDIRUKQu0ybIjKmcN6474968+dNnnSnqb9tq+oM6gvGw78gmqHibw83ju0i8PyiOzuGcPFM4C8+gzitzTbT4dXpktNV+12lwOj9AD+DV0umeFvh3peoafrE3iXzYrOQSyRStyOwAxXfhqTe50UarRlT+Grb4PeHLHS9Rma5GoSFnccqj8Hrz61IuqRShfKyQ3IbHBH1r6J1/4lfATVzPpnibUI5tOniYqSAGR2HRcd/SvkrUr3wS2rbfh290dHiJUyT45Oeg5PFdFWjpoVVrdzr5LmMr/x8qAewOapkneNk+7HUCuaHlbicde+etWIS2f3TAE+teXUpO5h7RHqmg+DLrXYTK2r2mn8cLKy5P5kVsz/AAh8QJFus9Y0y8kJ4QFA2PXqa8VnhuBGpV8ODncHOfpjpSfbdWtZRdWNw6SgYzuJ4pqnEhyuek6n8KPiDBAZ5dME0anloxwR7YFcGdPXT7s2d9ayRT45BBA/lTovG/xHRuNbl8voIzjH8qWbxHqtw32jUyJZOm7AzQ4xJJGs7J/+WZX8ahfSNPlPJIqodftif3gNPTWtNkOGJzU2QyQ6NFFlrO5eBjxlSQaS3vPGWkbk0zxJeQxN1Rd38w1XkvLWRcq1TYWfhLjZn2FFgIbfxX8QlkES+I73DcZcuQM+o3Vy2qX91JKx1CF72UnmQqck+veuuXTZy2Pte7HsKmNgy8bw1ZuDA8hu40yJ41cv/tKRxUsNzZAAXUKD3wM16dNpgdM+UHPpWaNDikyZrcKarkZUThjLoQbdhS34U5dR0ocFinuDXVTeELOQkqoUmsO68Bwu2VlIrOcWjSw2G8tZ8LBesuPU4/rW4b28t4cwsjY75yTXMt4GMf8AqrggCo/+Ea1KI/ubokDsay1A11129c7pIw34VpReJCFCm1z+Fc21lqlt80mCPanx3txDyE/MU9RnVRa7DJ8jwGMHvirputIhAMkwXdziuIbVplUmRVx9KqNrWmO371d7jtRqB6B5umyndDOpHvUUlvbzgqJE3duRzXErd6fIMxjZUqyISGRjx70agdKNMuEP71ACehHNK1sLZd7Wxk+i1nJfXAXBfOOmantZ9fvFf7LOq7exA5/SiwInMDMoZLA4bvt/+tVASR2E7G5jCDsDwfyrWXVfE9ttikVJAPT/APVVuS/SYh7+0V3xQkBixG2vVZ4whA9gTVObR3fLwyge2K7G0udDOZDEIj3FaSXOjuMRICaqwjywabeMxHl599tS/wBk3JUieMbfpXo0sdvIeJfLHsBWS+iWLsWW6fP1rWGmplJanCzaDp0lrs8sEuwB3HjFfo1e3Ojah8KtM8NWUscMtmsMkZGDghecD15r4hi0e1VwXfzBzwT61D4n1DxDpXh2e70u4YYwNoOSFHpX0WVYtRaIaPtvwLcXniLxj48TRpfs98ZbYh2/55q0eR29DX5M/t5eK1vvjprGlSXJJsLFMuTwrYbP8q+0fAvim11u6v8AStA8Q/YdU1aCGVGbAZzG4ZlJ57Ka+EP+Cguk2Gl/ELw/q1zOsl1qtt5F2E5Vmwo3E9epNfomW15XvEIU3JpFD4BfscfEf4w6XF45vLoW2kxzpLBjh3ZBgFeRnvX2jc+G/F0Hxg0bwx4s1Ga70xJ43gt5MsElU8k5PYAY4614L+zv+0Z8Q7H4e2Gl+HzFbW+lB15xwVcgY4Ocj1r7DsV1nX/h9D8b4cXPiPTLjbPC+ArD5cken3q8vHY6o52kepPDOMT6W+Ml7rXw98O3/iePUDfWMcew2zNncCDxjn09K+Kbb4g+AL7N/rHhs2hm5zEuG9eyirfiX4oar8W9HutO1I/ZydpZFJwGXPH41wh0pWtY4JhzGMDPfFfOZjiNDzz0W88Yfs/30YluYtSimA4wHwKr2Wr/AAu1FWSy1CaHpsMzFcD6E152ljbIMSIv4gUGy0w9UT8q+YniUwZ6oPDukXbmSx8V2EcZ6LIyZH1Jaqk3gPXrh1GlavZX5Y5VYHVmYDnsTXlsmiaNLy1sD9GYf1plrbvpcxk0l5LOTBVXV2JXPHAJxWNDErmKqLQ+3f2evB1zpet3XiTxbABc237uAHovuPyr6/k1uwuSI1uAzKOV9K/KbwH458R+D/tAvdSm1BZGD5k7Yzx+te3at+0Xo3hPwLperIqXGqa7P5ZUn7kPILfhtNfouS8tRJHBOfKj7Lu/Fdjp7hZrtbdCxHzED7vqfSuB+JnhrwJ8cPCl54H8XRC80/UYyiSRHfsbGNwI6da+KtXk1HxD8RvtWt30zeFLu0VtMmgb5SzBsiXkdtvrWd4Z8e6l4E+INl4d+1tdaHqTMBIxO+J0IGAP7p55r6t4SMGpR3OdV7vU+e/HH/BOD4jeGoSngDUoNU0dJGEcTYMqQkd2yST9apfBf4Yn4D3uqaTqFyVvryJ28nHAYg9Oeea/Wqw8fabATEH2SKvTdw2a8n+OvgTTPir4di1HRng0nX7QoEuz8qnPZgAeuPSvMzSpVqRtJ3PcwU4xPifS73XL15r61CybX2u5OXX8KvXl5qEMtrbG3w1xKse4rxyRXpfhr4UeHPhpaz6T8XtSuLfUNUHmw3UfEDj/AGenPPcV09n8MvCs8qS6R4xhkaFxLHE5BIA5wSVNfDzwzU9TfGV01ofdvwn8HaT4E8G2cFkirLeRrNO3q7DP8ya9A+3adwx2Bu/Ar5JtfjTHbLHphnSRrVFiJB4IUYyKSD4twSXTpI67G6HNfY5fgo1IXvY8GrWd9D6o1OHQNYtZLLUoIrqFwQysoPB+tfnd8c/2IbPxEtx4k+D10mm6i5LNbSDMb9zxkAE/SvoS1+IiTS/K2UHoa9U8O+JrW+RZI26fnXuYOpXwvvUJv06HHVipu0kfz3+Ofhn8Y/AV4+n6r4LvJY1b95Miu0bkDqPl4Fdl+yL488UeHviJrkOlRLp0zw+W6yN8ysoY8qcY61/QgNQ0vUpfst7bwz5H/LRFb+dfDf7Q3wX8N+FrkfE/4daKJNWvpNl1BCMbwxwWwDxjJPFYZzxDiatNqUbHs5VhaaaufPnxV8deNfiB4av/AIW3F4t/HrEDq6TDCqWGC2ST0zVf4WW7fDex0zTNOfEVlC0d1s+VZGyT1HoMflXD6FLHqfj7/R2Jkto2FzGcjyjxkZPfg16TKj2dnJuxiQsFHqMGvzaOOruep9BiaEPsnjHxO+LnhK/8Tae1vEJBYSP87clGOACo/iOa1/gV8I/jf8N7rWvjLdWkmstr9w72WQxlWCRiyDbyQMYrjfgt8ONM+Ifxp0nQtViV7WC6e9YjknysOEI6bflwa/fSKXSLG0isoFjSC3VUVABtUKMAYr7bLcc6cE+W58/i6K6n5ReMfF3x41i1C6jpd5BEw2slvvXKH+E4FfNniA6voLR2zW8unSz5xFNnf9OQDX7zyX2huNskcTZ9VFeafEX4VfDn4n6cdP1m2SOZ1IS4hUB48jqMYr7vK+MKdK0KlCy7o8apR7SPwgu/EPijRpzf6TqLWNx0MkTmNx+I5rvbn9p34wnRo9D/AOErmWONcecrMZPxw2TX1b8Vv+CfX2PwZdX3w31ia81u3YyRxT/dkXk44B56V+fXjX4SfFX4e2qXPibwvPbW6fNcXPWNew6HOCcdq+rw+Z4DGK8Unbuv8zim6kNyO4+It7r+otbeIrh724CFzeSAs+3HOQeR+dev/Aj4XeOPjRrEi+FbdrfRYm2S6jNGVGB1Csf8a+ffhxo+s3fjQ+ILlIzpa2+djDhzgnjI6V9K2XxI8W6Np0+neGLyTSLDJaSC3AG4d/p1rXHZfUlFqirDoYhN3Z+m3wa+FXg74SWtzY/D0zarrcy/vb58ywbu438gfTNezTW0Wv6cvhzx0YtZkvjh7eJA0ajuT1HGfSvzv/Z5/a50nwRp48EeOLMW2myOyxXSMzyZI/j3H9ea7/4m/ty+DfCKLo3wwsxqV3JuH2lsEI3fJz3Nfl2P4exarNOLfn/X5HrrEQ5dzovj7ZXv7OFraeJ/h1euLO+mEUumSyFotrKfmVDxjjpivyj+Ml1r3iPU4Vt9Ht7VwTI4twFQk9ztHWuh+Jfxp8S/Em+k1TxHqjTXyZKwA/uU+g45/CvDZPHupeIbo2gfbJbKC3PJycZNfU4HLp0qKUtZdTmli43P/9Tv49UsLZhHAiRsRwQ3P55rRh8R6rZxmPT9fuLZWOSqNxn8q2Rb/s/XZL3D30E8mOMttVvQc9Kvan4E+Ey2H2zRdZma5cZWMuWyfT71fE2ktbnOYqfETxxbkKniC4lQDozDGPyrprP44eMY7RIls7TUPL4zNgMfzYV5PdaJJbEHczxt04zVB9KbIYYwPaj6wwPoSy+NGozqza54a04RdxHgufod5qU+OPhDfD7X4h0qe3yflWEEkZ7cKa+cd8FicO2D70iai8wKW4MgH92l9YKTPoG6vfgbqym406S/tZ1+VVfIXnuSUx+tOPhTw/crBfeGvE0ENxEOlwSO/TqteIW97apB5VxBIT6NkiiabSZYHjazVi3QkD/CtaWM5XqUpH2rp7arr3hp9C1y603V5VjPlyK6/K2OP468ePw7+I9hvkj06O8QZ2iNl6du9fP+m3MtiW+zM1sv96M4I/Kuv0/xz4h05AsXia9jUdvmb/2au2OIjPcq51t14d8aWxLX2hzRL/FjBAqqwjslDOXhdlyy+Uxx7ZAxTbX4weMbMbE1B9SQ8kXBPJ/EniujtPjv4wjiaN/DmlXAxhS4Qn8fkpShAzcepyrTaTdoTJdgfWNv8KzJvDHhi+A3QW90OuSD/jXqsHxW0DVbZYPFHhi1hzyxtY1GT/wFRUzXn7POoITd2mp2TnqIA4H/AI6RTgktUyk2jygeE/DbfuxYwMxG1Se3pjntVCXw3JbyGNnBA+6F6CvZLTwt8G9VR4/D+uXNjLyU+1yNgDtkM3FSN8L4AV+y+ONLckcK0kY57d6uVQHrueGS6fcRdc49aYdPuHAIkxmvbr/4OeO75A2m6nZ6hFGMbLcqdx9ciuXl+F/xUtSVj0CW4CdSm4j89tYSpJ6k8iPPo9KmBG6Y1Ye1v4sCAK4966STw14ysEeTV9DmgCfxYbA/SsJtRtbZwl2TCx7MMVk8OPlGpZXko/fqqj/ZNSppiKclyfUGrtvd2dx/qZV/OtEWbkbgQR7HiolhiWYp0637rmkGm2w5VAK3jaOnLOp+hzUHlPngZrH2aCxmfYEGOapzW4Q43ke4rfMci9VIqubaOQ4bvR7MLGLbmKJ9xuZCR2J4NdBHqNsFAJqA6Zad6gk0+0UZ8wYHvScEgsXm1NB/qjipEvHmHUE1ki0tCMCUf99U1LeOOTKuWH1p2Q07G+oZ+c1A6fMQazmnuon3RHA9OtV5tUm/jx+WKmULotTNfyUPJ6UJaWTEnOK55tUfbtxnNVZLiSSP5EfPqM1zuA3I7H7DasMEg1WfR7QggRhq4SXUraJQJrmSFvf/APXUUfiO0tgSmpF89j1/nUEe0O0Oh2Mh2tECPSn/APCMaEBvW3AaueTXboLviO4mlPiZP+WqsMdcUD9oakmg6aMnywoqmNH0hiQZPL/EVm3Gt6feK0b+dGPUE/yqxG9uo3xlTn+/g/zoLTuVL7w8Hk/0O9YJ6dqyDo+swMRbzMR7GuqNzGcBWXPotPgM8hKoxOfTmkM5UWvi6NTtZVTuxIz/ADqnJd6sJQ87hmUYrvxaXG0rMHf6iq39lxMxLIfyosBw5nuD8zGpU1O6h+6cCu1bR7M9VYe2Kj/sHTzw4fFFgOVXW5Wb58mpo9VZiccV0DaDYlcKCuO5qs2g26cI+KV7EOBXj1OQYG6t601CG5gaC7YbD8mTyAW9awH8P3bHMQJB7gVVXw1q0vnQRl41lHzMRwD2/SvYyxXmkYyZ8eeNdF8R+CPGNy+n6kzXMBLwSq4yqt2XH415f4juPEPjS4efxVeSahcgYUznPlE916Yr9gtO/YY0Xxf4Qs/E02rvH4jlgVlLsWiCFjjILYznPOK8k1j/AIJ+/FaSeeaz1qwdVAwAi7m+or9uyqthYUbN6joNqSZ8HfATX7DQIdR8M6iRK4l3rnow9q/Tn4U2uhfFvwt/wre71i50VbyT7R/o5wXAwQp+Vv7vNfIn/DEfxd8OeK1muNSs44Y1LH92oJ5zjNdv8PPEetfDHxtbG5QRHT5lVm7Fc/Nz9K+ZzWjBzcos+ilWUoHsvxW8Eal+zfruk22qD7Z4W1p0gS+HBglYgL5pPY564HSk1BY4roxxSrNGwDKynIIYZ4r1T9qnxp4V+L3w0t/Dml3ceoxai6PMoILQMPbnpk4+leC6ZZ/2dp1tZGXzPIRU3ZzwBgV8NmUtbHjVIWNZ7WNwTmoRZJ071Xa+8r5Qc1H/AGkRXzE7XOeUjSjswOelXY7ZOAetc/HqbyPt3Yrc05H1zWtJ8P2Dk3eqTIgAGSsZYbzjthSa6sHgOeWgOroPe2i3PG5XgZYZHArxH4yaNqEng/w4+g6RdXxtSy5t2BY5LnpgnHNfpJrv7KfhkxWunadrMkN+v7y5LucmL+InLdsjFfnl8R/FGleFvFGo2vgvxLPBpGnt5ETsCwaQAFsfN0zmv2PgzI+Ztt7anDik2rHgPhzxT8ZbqDWPD1re3FqmmwF3sJx8yrhslOnHy+9fSf7L3xLsPiNqptvEml/avFem28iWiEZRoYmCsSegbIXv+FfO+oePdT1O+SRrjy7tgRLfxL88sB++rYwfu5xz3r3z9nHQv+EQur7xVo1xFPaahuS3uBgTKWOXBA5HzD1r08+xCpppHLToNM9P1nx5rGnvc3MVjLNK0m1AVO5cEcD1FQz/ALQHhi1kh0fxdqiaW5dBJDI21xg9T9K1ptRilcyy3XlywMWC43En8/Ws0fsv/szfFCW5+IPxi1ZBrF2vltEk3lhV5xhAwGefSvjKma9D2KdJ20PXviV8QfBHjz4a2ek2OsW+v3sMyNb7GDSRKFbqBzivme6021dI1jjMLlcO0fBJrH8IfADwT8L/AIhya54C1dNU0XymWKNGDMgyOHwTnp1NenG3TzHdVyGOR7V42NxCexM4y6nnBtdQt18q0eRcDIbvXnE/xI1u0v5bOBzNJAcMuea+j5SIEmlwAdhA9mxX5WeOLb4p+EvG2qzF8R6jIWikGdqr7114LNHTiYToH6F+E/jNqtjcDzVYmTjBr6O8I/HCI3Qt5y9q4AJJ4Br84P2edW8WeNpb268SwxrpOjlY1mCAvJIDzzx6ivqi8sbC6aS4GQCCVx6DpXVDiOK3Mo0W2fa8/wASvMtVntr5YppeFO4Z/Gu98F/EaeGSCxuI21O9uBt34/d49/8A9dflP8T9V1HwxpOja1pjsYfNCzqT1HPOK469/aj+KGm6pcL4TEdrZW67IHl43AdzxxXSs1hVVmz0qNCS2P1++J3wt+FcNle+PLrT30+8XZ54tSBvLgkkgAntzXx54qg8N6ppZX4bQXuoaiGy8Mh5VMYOPlXivmf4d/ta/FX4h6zc/D/xPcQPbPCTJLEctu44+nJ719kfslX9sPiFrEuqTiRLezKBmAwPmBry5Om5aHYpzS2PB/2fLO40n4satr87rotzp9vIfJnUhiSr7h2yTjFfa1n8edKvbQGeTE25lZSfQ4zXyD8UL6W9+Imr6tpluJ7fzj5cqfKzDJ64rzHWBf3KNeWWYJxywz/Su7C5lCm7XPPxEZTdrH6LD4sWcxHknrXQaR8S5UuYgpO12A+U+p5zX5W6H4/1q1Zw7G4EbYITnFeweF/izIt0glJjCsMhuOM17tHM4zOCtg3E/Vrwx4lv7i8la6kEkR+4pPT0rwn9rL4tXfg/wyvhOPQ31I6wNjyNEzxqnXqo4PHrVn4TeMdM8SeKbOzSUMoQOyk8Z4/xr6o1mDRtVCpf2tvexp0WVVYD6ZBraGIpwrxqcl7GLoy5Gk7H8/N5rOjQiKGfTprQKNu5lK5Hp0qgmt6L9lnurGKZ44uGdUYqo9+K/drV/hf8LvEKrHq3h6yZUOQVRAQf++aisfhR8JdK0650mz0CzW1vAVlBjQkg/hX3sOP1GKSpu5xRwNn8R/PR4o8WaNpdkrwTx3S3fG0EfkRXlB1430620CrBGOgXocdq/Xf4hf8ABMT4a+LtXu9W8J63NpizkukAYlUc+24cfhX5t/Gj9jn42fAO7udWu7Y6toluC0d1ECyR99zkDAPfrV1uLKNbROzNqWCk3qdF+z38OvAfxH0bxHqfjy+ltpbSTy7eGI5kB4AJABODX1joX/BNLUtWRPEGna9FHZ3sQaMSId+CeM8j+VfGH7H3gn4jeMfidpuv2FuYvDwk237nIV8HqO3av6TpLqGzjg0/TyFggjAGOlfO47Oq8Zr2L3OhYGH2kf/V1otPuYD+8iDAeop9vDcW7u4ycnIHpXaPcWbqQZVBHuKdYG1NwyuokXaSK+FmznMD7XeXKKkjMoX0AqVckZPWt/yo2QOFxmqM6oo4GKzaAypo+cxhdn8W4c/hTInsrVmkiKhm64pbi3hu1MbOV3ccVA+mQacgyfNDdCakCVr+2Jy5B/CrVudLuhsedYmP97NY3lIPmKcfSpfMTG1bdWB7kUNDTNqTS1UAWkqTHv6Vnz6Vdj5pIxj/AGarQMYCWVdg9BUragjECR3CjsKcW0UmVJLGWMcrtqsVliwWOQ3pWu91BIPkyw96sQX1lAOYQTVe0YzKSa6jUbGIHvTvt2p52qQ34Ctpmt9RcSSSCJRxheKf5drFxG+/Pc0e0YGLDHMz+ZcxeYT3yR/KtaKW3Rl8qzQsDyWduP1p0hCH5XJ9s1TdnLfu+TWkZvqBvLrep275tNSubMDtEeP1rbsfHPiuJgkXii5wP4W2/wCFcpAdTX7iIB/n3qUxXAbM0UfPcVoqjA9W0/4q+OLGTebyG+TGNswGPrwtdHD8d9YhwNS8N6Zej1C/N/IV86eWwuWyCV/Spz9nA/5aIf8AZz/hU/WZAfRM/wAT/hhr+2TxT4YNrOOM2wwMf99Csa+vPgFqwKQDUbKQdCcBf/QjXjkE9wmNsjlf9qi4lkcHzecjBz6Vp9dVrNByns+l+DfAF+g/svxXDAr5IEpO4H3+U1O/w2uYJVit/FGnzpKcJtZs/jla+dJrDSyhP2VAT6Cs6Oztojm2XyiO68UliV2FY+gdR+HXjq1kY2tu2pR9mhK4P5kVzsnhn4hQoZJfC14ka9XOzH6NmuH0zxX4h0ghLHXr22Zeio/y/wAq7rT/AIx/E22j2DVJbp/+mrjBHv0qvaRe4zJhmeJmF7E8ZHBDKeCOo4pJJ9LlbbnaT2KsP6V3CfHjxquIL/QdLuQ4xvIBbJ7531rn436dfQrD4g8L2xRTgiCPkj2OWrR0YPZjueU/YYC2YiOfQ1cSz2fLkfnXpq+K/gRqEQudV0jUrA91jBx+kZqS0s/gVrk6x6XqM1o7/d88FcfUlRWP1fzC55Y8EobaKge0JHzLzXtZ+GGj3rSDTPGmnxgD5A5BP/oYrEn+D/jOBfMs9Ws9UU8gxDAx/wB9mqVBhoeNT2EmcKOai/s/UNo8qQj1Feov4A+KVvEZ20EyxjPzJySB3wKwLuy8TWBzqOiXFsn95lOCfpik6Ijgn0O5k5mw/wBRSp4dgBzJCma66XUraBf9LV4D/tIwqmLy0uTm3lVvbNYyomXLYxv7KVRjOPSqT+GfMJcTlSe1dQIwTkEE+1TLEzHaw5rP2YkmcYdGnth/rQ49Mf8A1qpCO6hkZ1j8z0B6V6A1kTkkVQa3QMV6Vp7ItaHHNcTRt5v2fB7qOlQQ6s88pkNtJAycY9f1rtvsgblODTxDdW2UkVJSehPNQ6Q7s4m3/taC5mvYbqQifHyNghcelbEeq6vtwzLx3Nbn2eZwSVRM+lQNpkBB8wbs1Hsw5mNtdf1RCB5cUlXpPE7x8zWmW9BjFYb6JaId0WUb61E2nzKAWkL1aixczOsg16xmTfOgiHoalXUNFus+Wykj14rjDbXGAFVWHvUQs2H34kX/AHawnFpj5md2tzAPliuAo7AVWupnRQfOZ48jKgDkVxwvLWFtv2U5TqVOKsy6xYskIMc8JeRRuDjH8q9TLppSRE9j9ZtB1eHSPh7pd6IFjiW2XAb69DXm174r1vUrhG0q1jIkbLEM3Ppik8T6vdR/C+bTnjJ8m1QxSY4Jz0B9a+YPh98QPEuv2xtdFVkntJPJlx1Uqcc+9fo+Dl7l0RGep9Oajo+pX+nym+QJcOCBjnr9a/NLxx4Oj/4TbV/D+oMYbhF87IPzDBJHX1xX6rWFteJDaC7kM08igsT614T4u+E3hTxZ8RNS1rV1mW7RVRnh+UOCeA3BzjNZYmMmjpjiGj8g7f8AaT0q2+Itv4V1zTVsNJ0wi2mmiyWlkBCqzBjwOD0r6xlsYzbR3umTedazjejA5GG5r5o/ba/Zyk0n4q6JY/CtGa51iP8A0yQqQE+7tLnAHc19B+D9Om8MeFbDQZivmW0YWQr0Ld6+MzCk03clVXLcgltr0tkAmoPs18f4TXZC5hIy7AfWlhlhuCRAQ59B1r576hOcrxIZlWPhrxBcPA2kxi6nn4WJfvb89D26c19hfAb4Wa14P17WfGPi/SpDqVlBusVYKQfM3DAwetfHU/i/WPCd2NS8NTxR3EbZY7huBxjPXrXR6d+2H8TvB0Ut3eagurSXYJMNydzRnHY5Ar9byTg6s6SnFHLKtFPU+mP2n/jRL8J/A8ttbSN/wl/iiIlEGC0EZHbPHG4V+JHirxFPdhrmItfW8UmZFIGS7cknbjua9O+MHxj1v4na3Lr+uahJLfTLsEZyY0TphfToO9eNfActc/G06JfwC5s3XfJG/wB08dTnrX28Kry2i+Za9Tvy/Cqs7n1T+xv5Pin4z26ao9tb6XY22DFeADzgoPCDByT719EeP9F8J6F8Y7rwr4Ik+yxanDLcXFujHZDIWXaV6gbgxPFeIfFz4c+ENZl/tDw0h0nW4XJtHthsMbDoOnSmfCbwz4u8NzXniD4m6mdT8QXAVYmc7v3ajCcgnBCgV+cZznEa0uY6Mdg/Z7Hq/mRSH7OGy8cmCT1x6Vw+sabpll4r+03bs0cwDAFjsyOegNbt7KvmtOowzHJx611/w80fwprutSWviyQh5UbyVzjcccDJGOa+PqNzloZ4WpZanHeB5vsR1O9WMRpKxCBScY/Guvj1TCKMcGvUvjh4S0fw5LoVr4Lsh9kMQ+0pb4ZgxGctt/wr5rmvdQgkaCSFkYHGCOh961q0WkVUmmz0YXct2JdOgTzLmRCUX1r438c2viB57qwurGSW5eTYFYfdBPY19lfDcCfxvYC85Krkkc4xitP4i6zo0PiqQqkLs5wgOASR6U5U3y2L0seaeDdBi8M+CtN0OCFYGKB5cDlmI7/lXVQRRJDsYc1kTap5kzK64VemKh/tJF5PSvnq3NzWIjBXMPxvpP8Ab3ha+0ph+8jG+P8ADsK4vwxLpcvhextb7R41aIBZWk4II9ec5r1Jb6ASCZwG2g4Hv1r1n4dfCbwH8SPBM3i3X8xamkxjJj7AY7YPrXqYRTtoerh60Y7nzf4O0nQ4tburmwtY4i/SQDH4V21n4nT4fQalrVpuX7TGUfseSBxWl4r8D6Z8OPEQ0rSrh7mC9Xed3QZx7e9c3qAsdXhW21LLJEeAP4vY11RbW51xxdIoeHNbW709bqWXKSZIJ68+tYni2xur/SL2DRrny7m6XAlP3V4rcfT9EiI+zQlARjaKbrMVvJ4budOsYC8m0sq4ySw9K5XNtnDOpGc7o/Ni7h+LfgEX11HPLKkEhJdsESZ9OK+mfhRqXjfX/Caaz4utFgmuD+6I7qOST+B4rF1HXL++8rRG3bnba8TqTgZr6O0Sya30e10pmyscaj2wBwK9DCYuUCMXGEti/wDC34ha54E+IVlrb5msiRE6knAXj5vwxX6Bx/H7TZncbo9p5XDGvgSLTYtwJA4rL8QbrCCKaBmjXdzjrivoMJmLPIq0l0P0aT4ywT8xMrfRj/jWpafEOS+YHJCk9Qa+BPA+gzeMtMvtUtNVNgdPOUbsx5+U/XFaFj451rw7ILa9lEkm7qD97HtX0WHxKe5xOgfp7oOvylQ7NvB755ruPs6+J45dI1uNbrSbqMxyRSKCpDDB6818BeDfi1HqVsWt5wDFy43DivY7f4n3N5pZisLoJI2cEmta0oyRtRp2PNL/APZv+KXww8fXPi74SNB/YEL+Y+ny8LKp5ITaD82emTivW/8AhaN/EsY1qzk028ZAzwydVP4E13/gj4nxR2tvFrVwZiDw3VQeme9b/j7QfBXjq2guphHFcpJkyAcupHc1UMVOLtJXXdDnRT1R/9b0e00fTYF4TzCO7HNay+RGMRxhfpxVNcpwKjkuVTqa+DOcr397ewNstofMFYctxrMwIFrj/P0rpRq8MACAAyHpms+51J2bM8gi3elSwOfFp4hm5S3OPUf/AKq2rGy164TyriaBEToGA3D65FSI1rIuRd8fWsbVbNGZZLa4LH2NJAalxYTh/LllSRh02AY/SoxbpEMOcGsm0/tJl8uNM4PLZrTnsb2K38ySUEn1rdbGhKYlk4i+c1A1ndjlLcH/AD9KwDNcQsfmwfalS6vnPySHNYTauBcnWSM/vV2H0rPdyTUjw30vL5NRfY7gfeBqGMbubsanSRwOGNNET9CKvW1mZR1C/WhCIN8p/iNNP2ncG8zArW/syTHJGfSlXSyvzOw496oCJNTu0XbuBAp39q3XqPyqOc2cJCNuJPpiqrMh6DA96rmGWzq9yP4Q36Vai16bbholDf59qw2wOaiE+1sCMtnuKzYI7SK5sbqP/iYS+Uh67Dg/0pY7bwqzhWvJ8H1JP/s1ci8mVwBioUY55pxG2em/2Pobp/od0XU/3uv8zWfc6Ra2+GjbdXFR3csRymatLqkx4OauUlYl7G8+nByNi0w6fMnIjJ/CqsOriIZcmrR8SRKoKlifpRFozGj7TbnP2QHHdh/9as/UdV1MhDAiRFTyBwP5VpjxNak/vFJHvVeXxBpEp/1Wc1fP5gUotf1SUjzmDDGMdqnSWCeTM0K/lSfbLCcfu49lQmSFzhTin7Vgaoj0hhsESRnueh/OtKDWbzTrUw2Gry2uOm2ZsfzrkjAHPrUL6aJCAE/U01VaGmej2XxG8cWEkbWnim5kVeSjSMwPt96u5t/2gvH8KB7uG11ApwEnRXU/XKmvBIdGeJhII8Y561Pc7ggVeDQ8RLoWe+f8NCXd6AviTwlp9zGx5EMSFv8A0AVetvHHwN1mVZvEXhy60515/wBGUgf+O7a+Zc3kQ8yI/NWnaTXsqf6Q36VKxbvqjGR7teJ8Ab+6K6De39hIx6zs2z9XrSTwN4YlEbaT4zslnfokkinr0HJ618/mW1RW8y0WU+nPP5Vz91PBIPs9ra/Y2Bzuye/1Jrf63HsJH1DL8KvFMsTTafqtrqZHRIiPm9uBWIPhb8VlJaHwxJKG/wB4/kdteDRatqNqVFnfz2xH/PNv8c12Om+NvGlqPMtvE14jL0GUI/UU1jIdg1On1Hwz4u0pS+s6PNY+X95WU5+vI6Vx0mrW0JPnvtx1r03QPjN48gYR3Tw6kV6m6HDD32gVqyfHLWI90ep+H9NkdunlqcEe+ar2sGI8ngv7O4RZYp12t0OauEgn5fnH+zzXq6fErwJq8e3xN4SCRsPv24x/NhVKG2+AetXBWG3v9OZujMy7Af8Avo04uHQDzYI0n8JxTmtzt5Fe2n4VeHNQjzovjW0tAw+RXyfz+Q0L8DtfeJjaeILTUWUcCMkbj6cqKmVJ9APBjCmcGozCgJxXpGqfC34k6ZIY5PD8k6jo6MmCPb5s1zM/hvxFZoXv9Mmt/qM/yJrF0pdjVI424t4xkgVDbJb3StbXSYVOVPoat3BaFz5qOuD0KN/hTz9kurR/n8psfTmujDx5ZaicXY+hNS8cazrXwgEc1zsmsn2fL0O3Bpv7HVul1feI4bpCZJ5xcFiOSWLE4rz7wdpV9d/DTUgCZGkuiFPbGF6V7v8As92MfhfxGumSYWW+jBX1JXr/ADr7/AVlyGfKfU2o6dNDFJKgKNGCVPfFed+G/Eul6hq93bCaN5SQWZiARg55r2rU4p5wyt0cFT9K/LH4iahrfgfXPEeiaUrSsJhLG4J3j5hlR2xgV21KqcLsT0Z3Hx5tpR8R5tUgC3NjNbhWnQ5RHA6A+tfOUWo2VzeyWCTq0sfLLnkD1NfRng79qnw9F4Yi0TxX4Nkd4FALYBLsB94kv3Nc34v+Mun+LbKa00Pwxb6XAy7RIy4k2/UE96+Qx7jJlwZ4tcPZQRzS3b4iQdc9c8YHv6V7P4L/AGX/AB94z8Nx+K/Dl7/ZTTg/Z0uMgsh/iYH14xXE+B/D1n4k8QaD4duIxJFNcRySN/fAYE/yr9d2ms9EEGmwt5FtZRqqooGCAAB/KvQyqnZJxWpTa6n5BP8AsJfHOa8vlXVbdYmJO5nJLscHI4r4z+NPwc+IvwdlltvGFvNISSI7o7gkuPTPWv6RrvXUAISUpu9McV554z8LeGfij4Y1LwvrVtFe/aonjSWYco7gjcCP7pwRX6PlnEeJoq04rl8jyK+FjJ6Nn8ot3r88ZVZDtJPzbuNvpn0z2r2v9lazudd+K2ueIHXMdlAEVj2OAf612Gu/sW+MNI8ca34T1LUvscFvcvKty4GHh3ExgcHkKR2r6z+Efww8NeCdGk0zRkLuIt0t04w8r5xz0H6CvI4qzjni0j6Xh2PLucldapdTa7HEqEyQfvHbHHPT+VNW/wBTmJkvOZNzEEdhnj9K6+DTGGqX24AA8flmnSafGExt5r8gniJOR6WbSTObjupXwrjIqjqGuz2Mqvb2csskf3HQHIPsRXSNZ4bAWhtLnwHSVgfTA/wrsoVLI+fiyb4cfG/xF4Rnun1HRLrUXunBJnBlAA4GN2ccV6R4h+Nl14gtWttM8I28ImHzSvEqyDPf7mc/jXlTWd6OZcnHfFRl54x/rMe1dP1juXKRsx/E/T/hLNb+Ib/TJNSnvf8AR0hQFmVn4DD65rwW48Q69458bR+NvFtv/YVral2s7Zfvbd2C8gwvvxz1r0O9VruU/aMsy8o2Adp7EZ9K4BvCAW5nu57ye6kmbP7zbhR6DAHFYVcV0KjI9W0jxX4S8VX91D4XncxQRANJKOGcEltuSe1SsLAcrKSD3NcJpOl6fo0e21gCcYyMirjTSc5ORXHyqT1M5T1OpAhU5ik3HnHNfSvwM1LS9K+HOqy397FamCZ5JFlYL8qgE9fXHFfIKSuo+U89RU0epaA1jqNsltdw6hNtZ3J/cybTnAGe/TpXp0JRirFwqnT+N/jT4e8d+LvP0WQR2NopiMjdGKYBwfwqvDeXLxebDbNJG3Icjg/jXIN460i+8NXmg6j4TENz5bLbTRLgiTGAT83frXZ+Jfi74o8ceDvDnw/03QE0iDSyPtN4ABJKRuwOp45HauetUTNY3JY3lkB3x7K7/wCGax6r8UNI0eSIOk+FIxkduteV3trrUl0JkZcJxtHQ4717J8AtbtvDXxETV/FYjht1TEch/v8AGK56HxGMpW2Nr4g/C/TfDtnqmrz6CgeCTAuQMBckc9OnNeMr9gEMItLlLiRxk7Dnj2r7O8afGXwRFcta6rexXemzKUlgHU5Oc/5NfGvj/X/h/eatB/wrexktQmY3z02dM9T1rvrw00JhVEaYxvjtUN1b3Wr+Xpmnxia6nyI0Pc1xk1xfwSY3NtPQmvQvhhpGr+Ivij4c00sYo/My7r98YBPQ8YrbCQa3OhSuj0vwN8PPEvgn4f6qfFEC289xNG6ovYZPsK8Z1O0kvvEF1No8Emo3NjEZWgRd3Axz39a/Rz4/6Zo2laHBpMWoDz3LszMDnIxgHAxxX5feP9G+PPhq60bxd8KvD0mrzNMwleEjy5UBI2tuI9u1ezHFcqFyngnhP4g3PhT4n3WpaJeC70TUmNtPbyt/x7uOo5zg8jjivsqLUngjQWouEVgJPMLNtCHnI/Cvh61+HHxBm+I194h+JOhtoVxcuJmsBjYGH8QwT1x619l+GvEnhWGNbrxLYTFIVWLanTYOPWlHHtsOU+7f2evB2p+I9MuvEmtIraOqFLdQfmY5GWI7c5r26QWmhFrZoBPCT8nPIpPhBpulzfDvTLjQrh7XT50YgNgEZY9a5j4hadaaHqqqutJBPIi5WY/KVGcEYHXNejDGuxLif//X2pbrVdx/eYFV3v7gAeaSxFdHcweTJseMj6jiqzraYyQK/POY5yjYTR3LGRgflqzeQxXgAdOBUnmRFcQgKR1xSwxLPx5u01S1AhtfD8Tr9/APbNaS+F4x92QiljsJYHDxXHyjrmrk2pfZkHmOGPtVpDMuPStdsnb7MUdT0yR/jUn9n6hOwbUEUMP7tVpNfnL5iIGKY3ifUUH3Eb/P0rZGhdm0+yhIa4+Ve9Pto9ISQGKUbvcis611qDUZGGogLjoDwCa6K0stOlTeIlH4CspILExWPsAaY0SSDBAqaZbe3jLNIFA7k4qnHd2hAKyg59OlQA3+yYG5Lc1FJpEeCVYg1dMsR+ZW5qrNeSA4Q5oEZkmmXBG4zHNUFtbiOX5pC+O2etbRu5iMNUJaM8u233pAVjHIesOPxFUruNgQVX61rrsYbkkL0FQ3XvQBzuE/5aHAqzFLboNkcpH1p9xagn5e9U2sZVUsBQwJJEiGX35J7VT3Ddz0phhcnHNKLeU80gJlTdnBxSNE4GVyTVcvcxnpVhbq4QhwvSkwaDF0w+5j8KjHnj+Dn6VdGuXOQGjXj2FSDVIT80ihSaImbMvdu+WVCFPXFQm1sPvJI8Z+tdQJbN4hKrKx9OKWNRMOLZG/D/61XYDmI1UYjhkMh9+a0YrC+BDsRs9M810Ftp4SXzHtgg9q21tbeQZAK49aaiBzkUEgXI7U9DNkEnOK6XyIAhTNVUgsVyJG5osBBG7kYPcVUltSzbhzW/5UJT5O1VGULxVIpMoLGqqNyjNKqrk8YFSMRTOPWs3Ehoj8vbypwaZNZpd4E3zDvmpWNJmUL+65PvUCiiNdHsQc7JR9FOP5VKdJt1G6EEH361Gt3ryHBjOz1q4s9xJzIpzQirGdNYzFdvBHvVT7M8fP8q6AAt1qT7NGy/NzWypE8plx3WoGJYRcsEXoueBSNudfLlbcp6g1pfZEH3RR9mU9RWsFYOUyY7O0D71gUydjjH61dtp/ElpJ5lhqUlooOQI2xVvygBwuaBEfvKla+2aDlN+18f8AxRhuEK+IryUR4wrSnBx2rsYvjJ8WbOVZitpdBe0o3dv94V5g6yhtyHFIqTf3ic+5rSOIkapHt1n8aPEd4h/4SbQdNmTuEQbj/wCPGsd/HPwS1S4nbxDoF1YzLgN5AIj59AIz/OvIZxeR/wCr5qjNucAXGeWGcjrXVRqcz1FKVj7ql0Twvb+CLHTvCkElna3eZlVhh+mcngenpXPeCfDi33jTRdet9XgW+tGaM2xxvIBUf3uOnpVv+3orhNEt43Cxx24J3HGRyOK8u+HMtrc/HmOAMCbeSST5GPALZGcV9PhbJGbmfofquoi0ina5HliAAZY8EkZ4NfnL8QvDXj3U/F2r6xF4cne1mlPlSq4OV7Hhelfa3jjVXudD1aIEO7odnPCleMivzy0z4leNrO3gTTNbmuVMjAfaGOF284wSQRWWLxVo2JlqzJbTNZtXeLVrOeJhyd0TBQPdiMGsm8jsNmJIWk9tpI/lXq4+PnxBlT7FqenadfKpI+ZEyfr+7NbOi/HGOFZrXxJ4XszFJwfKiQkD2OwV8xVlre44bmX+z3Y2178U9MxGHW2SUlCwXaQhxjPvX1J8SPiPbad40XSCyxSPFnYzjJK46Dr3r5/0Pxz8CbDWrfX7Owv7PVo2LExu4QZHOQHAI/CvJfj/AP2X4o8S23jf4cakbu+KDzlklJ8ocbuMtivocqxajYJdj7B0/wAXyXrMHfzGY8AnOK9G0W8lnj8vZsJ4z0Nfmt8N/iJI9zFYXNwV1KA4cMfvN/8Aqr7v8GeJnvYy1xhZV6ivt6OI51ZHKoanS/Fj4RaX8RvCki2kSxa9Am6CUDligwM+vbvXwVpAv4V1O2vV8uSzBjaI/fUqR1XqM9ea/T2x1YOIXhceYVIXHNfmd+1n8QfDHw0+MNtog4n8Tx4m2AJscZwSR1+6K+fzXDPldz2cHPlPMYNQaae6mKlsNjH41beaJlz5e0+54qHRZdOtrSR9TJWSWRkQoMh8d+3rV+TSllPnRbip6A/4V+f4nDSi7o6sRWjLczgqscjirYmEYyByKqTW88R27SMVVczx9VNTTqtaHk+hPdXbtG0Z/irm3tnk/wBX1961zKx5aM1ct7mBf+WXT1raVS6B6nMvpWpEEq8Y+rD/ABrIudP1NDztYe3Nd/JcW75HlCnqkbAYAArmcwPLVt5MkSK2fYGpBp+77zbR716ZJDCvOBn6VDHYHUJVghEaE9WbAAHc1caguU84OnqHWOOZdx9xWpdQ3qwpBLMrRr0Ga9r0r4ceG9WtzJfeLLG2uw2FVVjG0f7XStmD4C67endoHiTT78Yz0RsAevBrbmbLUbHzYh1CLJZ8p0GKfFdwo5+0My8Y4NfQ1x8DfikVZrXSI9WSPgvFlV/8dWuHvvBfiXR2P9t+HzaD/bzz7jIpczRopHn8F7br/qnwijAqpc+RcyAzHzFBBAPIBHeumudA024XeN0THnC9P51UHh62jGEcnHr70oTs7nPNmHZeEfB+rXpfW4liRv4wNxJ98V7Fo3w9+ENzbx28OvPY3acJnIjwP7w4H61wkWlQL71C+kWiEttzk5IPNd8K6YoQPVT8E7XUZlXTvGumrDIcAvtyD9PMH5103g34Y/En4eeIH8Z6Xc2HiUWymNWt2UOm4Y4+dj3rwJIrWM58oA9sVah13VNL3Gw1C6tFbkrFI4BI9QCBXbCtE3i7H33q3hnVte8PWEviWPdcXitJNE/LhWAJw39MVx+h6t8SNKtn0L4Tm3NlasQbe4IyreoG5e/tXzTH+0p8Q1tl0nXbeOeC2iMVvOGxKVxgbvl6+vJrxTS/iT8UNJ1a+u9K1Fbb7aT+8JyVBPpih1YlOZ6R8RtU+IWv+N5/+FjiJdTs12qYujJz7n3rmWinNuTCxDS4UD0bsaxP7S1O8ma61e+a/vZTlpXOSSew9q7/AOHujS+LfiFoPheElxNOrTY7IGHX86UZhzn6lfDKy0/QPBOh6LqrPO1zAGJwSq554r8uv20/iVeaV4+W30l5J4I8oiEEsoXOfw5FfsrNL4W0qG20W5miidYhBHnGQcV+Xvxo/ZY+Il14yu9ah006/a3bkxSLI+VB5wQBivQU2loDkf/Q6K51+TUcSPgYrKeV5GABr6Cb4E63BGZ9Ngi1OId4ZFf+Wa5XU/h7r+nozXGjTWyJ1YqT/SviJ4Y5zziK1MiZMmzNH2GPdjz+fatldNslybxJgFzxsbnH4VVNtp5bzYpBAp6K3B/I4rJ0mBRNrJGu1ZSwNZ9zHOP9Wpet5fL8zYrq2e4Oasw3ENmxyB+NTyu4I45XvI8n7GxpjG7lG4wFMV3D66iEgAGqE+rwXP7tgqZ6mqua3MrStQuLWQpcIHA6AjpWrJe73LA7AfTtVZbK3lJZJ1YioHSPlMih6gaL/ZLuFoncuW7Z4rOeynhCiBCQowAKbDaurB42FaJk1NR+7mCD3P8A9es3oIqfbdQhj2izZj3IrRt557tA0kBhK8YPf3qp/amtQHiRXx6//rrQg1lpF/01V3e1IbJPLOcYoNqXXO3NSrqNkT91s1finVx8owKdriMpbSZBwm0e1LsdeorbLcdarSIrU3FhYxZY93Skjt2UY3cVeePGSKoz3RhGSucVIx4tVb2pDZAcZ61HbX6XA4XbitWMeYAaLAZJsBnrmlXTox981uG1yMika3IxmnYlmG1hbj7oBNUZNF89uMD610rLjikGBT5SDmk0UwNuz+FWFmntBiJD+FbEjYGTWe9yu/khR70gGi+1MndGTj0NWI73VJm2yAKo9O9MRxIfkIP0NXo0YEHNCYFiBJmGW71KbFmO6lSQgYNK0l3wY8YPrV2AlVHiHPSk2b+ajV71uJFX8KsRhu/WmBF5A9KPs0f93k1aLMODRvaiwFYQL3FMeANwOKub2o34GTWcojRnnTtwDGdgfSpBEU4z0q4XFQu3FQtwERAe+KsKoxxzVLzB3FPWURnI711LYRc8sMetQNay5JWUGm/aeKcJgw6UwHgPH1Gad5o7imbxTflzk1LQAR5hyKTBWq0+ox238O76VmyeII/u+Swb3rOUmNM2XaqF5As8DgdQMiqf26SUg4wDVxJdyMG9K68PuOex7DpS32raN4ev7M75IZBA4/2ff86p2Nw/hD46S3Mtv9mZxhj6gnrzXoP7NPhu41nQtVvrt/3Fpc703HoAF6V23xR+FWoeMNXtfHfhYNeN+7guIM7fucEr+vavpaFR2Odo7bVr+z/sLUZZZTuELMCOh3c/1r84bKQRW6sDkJIx/Ov0017SRZ+D9UsU0z54rRc/Lz90Z7etfmjZwxJaRr1DLk+5ya4MfKT2GKZWlJZQSDT452iHzqcDpmkIZOEGBSrFdMeWyPevEm31LjuPN8Jn++Yz3IAzj8ql8q2VDPESit8rEfxZ7H61XMc6n5wprW8PaVNrWvaZ4Rxte/uEZj/Dszzk/jXfg5O4TseX6p4J8V6Dqlvqsls0EV82+3mPAbH/AOo19UeBPHF2tusGqfuGi+VnP8VfQnxC8N6b4h0q18OsqomlooiKj7pA7fma+PvH2neJdM1GLS7WzL2iKWaUKcHfwBn2xX1eCxMo6GCjqfbnhTVL/UY0l0RxO/UDtjvXlf7TP7KPh39oHwjqHiC8eXTfFOnQGWC4QgZaPkjkHtmrf7Iek+LbmS+1PXJSljaNsiU9SCT7+1fVfxO1dPD3gbU9VWIvIsTAYHTPFdmLrtrU64tpH5K/swePPClx8NYtF+KHhi5vpdHmktknXA3+UAA5ywPPWve4/En7OmvxuYtGu7FVYozucYPTjmvmbRteuYorhbVmjguJWkKDpk89Kuu01zFslbcuSQD0GTzXyuLrrsO59Ff8Kw+FOsnd4c8apZtJ8wSbJ2j0zs/rUs37Pt8tl9s0fxPZ6suRwpwxz9QK+fLfS9KkUK9smeucVqf6RYYbSLhrNh3jOOPwryXNPoFj027+BfxJjG+20g3kf96OSPH6tXEap4A8b6b8l3oU8AHVjtYD/vkmrmneOviDpHGm+I7xN3VTKStdpYfGz4sWiLtuLbUFT/n6IJP1y1W1Gwcp4hJYXNtJsvAYDzndFJ1H0FNEBDZWYY+hH86+j4fjprt0S/ibRdPuMclY4h/iabL8Rfgd4iUv4k8MXNncD5WNuhCnPcYSslST6hY+eML0Lg/jTlTHGSufTvXv40b9nq7QNZPc2Pm/cadtxHucqMVOnwg8K6nKJNF8ZWcaj+CVlJ/VxUPDPuFkfP1rb6VAzSLYKzOfmJLcn86uSzyQN5mmO1i3rEx/rmvY7/4J+K4fm0a7t9bQ/wDPDC4/8ebNclefDD4m2szRz+E55I1/ijl6j6ba1VOSGcdZ+IvF1rITb6/cqhOdmV25/Kunv/H/AIv1TSn0i+u/PR+N7KN2PQcVh3vh+8sHIvdJurVl6hlZsH67RVFZLSNtrNLGR2IIp8sgMwWmwCNM4XgZqKS0uNp8vG7tnpmtgSQuWaFt4HU/41HIwlATPIORRyMxktTFSKWP5ZyPM7gdKmeAMlWU06RZDJISxap5ImVSEHNCbiXBGA9kTzWZcW5PHYV0yxXhz5oAFQTWsuMqqmj2jLOUmskZOYgxrmrnS2BLFNor0ZrSRh02n2qFNIy+5nLn0PSk6jA8yMZtiCUIA71seC/Hes/DTxS3i/w1Gbu/cbAsn3QD6dOld9/ZW9cGIOvfiql3o9ssWxYgrfSlLEtWA9A1H9ovVNWnsp73T5nvIjvzGeA5OecnpzXoU37WvxVlKxWtrFEkagZY9cd+tfO1rbSWYPkMUJGDioJ4Wds16FPHPlCx/9H0HTfFd7ZbpU1W8tJCfuxOwT24DAV1Np8YvG1pKFsbtdQ4xsujlT9chq4JRpyHN4MAUxrnQPMDWjEOO3avhvbyOc9th+N13NEI/EWiWaBh+8EEat9cHaD0qG78QfArUwrahpF0WcbiYywx+TivJi8EyBQcE96W3ggty7Kqtvz17fSrVWT3A9Ss/DnwW8Rtv0LUpdJZT0nYn+bGrrfBS3vI5J9I8V2tyAflQ7c/TpXiUsdsrbljXP41Yjv7mOEwxO0QJzlDyKrmT3QHot78BPiOlubqOxGoW/8Aeg/+sBXmGreBNd0ec21/ps9u5GdpBJI9q6zR/FfiTR1IsNYulyd2CwI+nSvQ7D43eMtPiCStDdMp4aZcnHpxin7KDA+bpdPe2mSKKOWNzwwYEEGupt7WSFAqxpLnB+Y8ivpO0+N3h3VYv7N8TeGIriV0JaaFcckc9TWBYeGfglrl79vkaTTPM6pIeAfUYFaLCq2hfMeD3CyRNkRhPYGqzS55mIUe9fUkfwQ8F60kj+HvE0J2thVYkH8cgVl61+zh4qsohLYbNUiI4Mcicj8TUPCyGfOSXNuSFhw+eK3oolGCIFY+4rU1j4ceJfDrb7rR5bfH0c/+Ok1l2rPsKPujlH8Lowx+YrnlQkgLpSJxteFU+lOjtI06GqJjlD7nmQ+wYVY+0mJcFc1dKmwLXkL60eQvrVNdTjQ7poyF74qJ/EmjqcfNWk6TFcvm2QjGagew3dEDfWqg8TaP/tVci1uynXMBP41zqI5LQiXTiv3YguPSnCPy2AIxSyajngyAA0xXVzuDhqrlM4y1LWfSonf1phlCjmq7XCHrWXKXzFgR7xml8io0uIFXG7NSC7tzwzYqkiWVrho1XYw5rH8pC3zruB9a0rue2LcODVYSRNgIc1gxEkccY4RNv0q6uMVTDAVMHFOMrAWQCeB1qOS2eVo23smw5IFKgPY1KyysMIcVruBZD44FSCUVlG2ug2fN4qZcrhWOfegC80mabvqpJnGI2G73poYjgnJpgXN9QPIQOKj3elNOfTigBrXLClExYU4Y7ikbGOlZtO9xkEkhA+Xk1AJZmOBGx+gqwZYFOGbGPWj7TAOFkK/SthAM4wTzUo3barG4iI+Tk+tQG5YEhWAPuCf5UXAsmZ1NRtLK/QmmJuk+YMsoHUghf/QsVejCqBlMH6g/yoAp+Xkgt2qN4g5zjNaDsp6UwPCw2g8iolHUDNCHPTNWYBIcgL14q5tH8JxTEhmOcSYNddF2Lkj1z4cfFab4c6PeaKLczi7BIwMnP+RXOaR8cfiPL4qs9O802ml3d0sZ2DDKrtjOMAcfWuSsJtR0y8TUbZ1aaPpvGRXotv8AF7xPb5iu9Is5kII3opDjPfk17VCsjGUWfpor6PdW0FrezKwubZUbJ5fIGSa+NvGH7KOoWuqXF54J1OK00+bGIJsPsJPYsCa4TRP2gNStXWLX7V5Yk6OvUDsBzVu7+IHw68VEnVLnULLfyTvAwT9Aa6Kjg1qPpqeP+PvA+s/DLWotF8RXsN29yu5XjwAOnoB61xw+Y/Icj2rT8VaB4QbXDfaZqVxqJT7pmbcMe3AqgPLjAEYwBXi4qmr6EplZkY5ya09HvZtM13T9UjOHR1UEdf8APFVGO4YHFREFokx1Djb9aMNe5lK9z2zV/ixf6frUunXpUy4UouecEDrUc/xt8Y27NaW1lZSxoMhZ0UttHrlDUKaDZ6l4h0+3uo4VupYFkld2G5cNgY59MVxPja1sz481LS7SdHltgAyoRxya+mwy6msUfbnw4+IF5qnhqLUZYYbUuwDJboqgnn+6BXoXi67/ALQ8EazbXy+dGbdiB6dK+P8A4JarcRXMnhadgVkbfH65/wAmvq3WbO6t/BPiG+vG+7bEBfTkV215XVjeR+YOnaXaHTg8CbcuRzV02BXt0qjpV/GLCMKcguf6Voy6gQcAcV8fjIO5miHZ5ZpWckVXe43nd60JIp68/wA64bjJQTTs9qkEDMvnCRQv93+KomIxgcmgCdGwMUj3EY+82Ko7ZyeBVhYARmVN1CYFn7XC6bWjVx9BUJktPvRwBGHQrx/KpFNsgwI8UuIpMhMJ9RTuBUXWPElm2dP1W5tRngRyMoH5EV3mjfEzxtpMCv8A21c3M0a8B3LAn0OTXLR2spX5JEP1BqrPa3cIZ1EbAfWhTaKie02n7RfjpIAL7TtPujj5vMRSSfxQ1s2/x80S/Ro/E3ha1kDdfJiQH35CivmlC0oLHg0jNPGQUwfWto1+5R9KXPjb9nbUJRHPoV7ZtcEByAVRSeM5D9BStoPwAupFh0zX/sMvUGV8p9MljXy/cSec4Mq8d6RY9K3DzYwQvbnFOWLXYD6hX4QaXqX/ACCPGVnc7vuKm0k+3Sq8/wABvH1grNBapqS9QUbBP5CvnIKyv5ml3Zs/9xv8atQ+IfE2kMDH4g1Bu+EZSv45XpWft4yYHp2r/Drx9Yw+ffeHZbSMcZ5JNcVPaCzH+nAw7euRV/TvjF8TLNi0V41zCg4EoyCfeuotP2mvG1oQL/w9YzqOrOjE/o1D5egHnv2nSPurISR6imq9m2T5gBr2PT/2h/BepvKPFPglXZxy8YwMnrj5qsweIfgB4hmzJo9xpzHnJxgfzrRUk+oHiTBByjkD2NQOqyHJ5+te8TeGPg/qaE2HilNMOeFkBJH5LUY+DOkajBv0fx1Z3R7Bsjj8hQ8OgPB0ijZsMOKs/Ybf0r2C4+BPjyGNpNKSPVtoyPJkQbh6jcwrEm+FvxNiQed4bmU5xxJGf5NWX1aXQD//0rj3VvMPMuX46Yp4uNOFu8Vug3NzuI5H0rhHnkDYk4qxHcsOhr8/9oc52ltcSlfLTLEDtVpLngB+a41DIxEltKyuevpV+N50AaU1aqDsdI1zCGBY7RV6DUNOB/eOCPY1wt04mO1zx7VTWONAQmfxNHtQseqf2lpW3KI7e4FV5NS0o8NHLn6GvOo7iWJdqsQKU3co5LH86tVRHplreLGfMt3ZAffBxT2mjnOHQSY55Ga8uOpyL1cgU4ag8hCxTEN7GtlWshpXPSF1fTbU5EvlN3Ctg1u23xO17TvLTTdWvI4VGAFlbbj6V5C9yjbWMIZh1PqasxSyXGG2BEHGB0pLGu5pY+g7P48+OICspljvDGM4uBu3KO2SetWrn4zQakTc+IvD8DxuMt5AGfyANfP2+MALIwFSkQZBLsy+grSeNaQme0/8JJ8BL+VZbzRdRs5psZfLhFb1+5jFa3/CK/D3Wo/N0XxhFaQxnG2Rgx55wfmHSvCDcWhj8oFmB6oRnFFhodgx81LcpGTk9gazjiJS2RPMe4H4SXV4zyaV4hg1GAfwpjn8QxrmX+FHjaS4kS00JrpEJAZX6gd/umuHuor6ylQaVcyRwN95Y3ZSv5GtW31XxXbbRpWv3VuzkAhnPJ/Emu7kbjsZt63F1vwF4o0mHztR0prNScABTIc/kK4VFaNmjkn8gr1DLtx+de+WXxg+IugQ/wDLvqZA2YmRX/H5lNdHpn7QS3cb2vjPwdYtHKuGkhjXP1+6K5VSV7FOd1Y+YXlhBH+lCX12mtSyncjbE/B9a+jrK9/Zy8RSGCfTZ9MvJOsoz5Qz6/Px+VS3Hwi+Fusn/ilPGkEX+xIwzn06GtVhWzO58+/aruI+W2D71L50so+brXp2sfs++OLR/M8PXlvq6kZARzk/pXH6v8NPipoELPqejmJQu7KncMVi8O10NDm5Eb7yjpVJy4HzZFcfNfanE0n9oxXFtsOOUOCfalg11CDGgaTA/iGDWbp2A7GJrVxtJIc1cQC2Hmqnm45xnGa85l1lhIFhUv67ecVsWmpTMBvyDXPOGoHYvqssqeY1kIV6c/8A6qWO9jYA7gM9qwP7dcERTYMXWh/EFjF9wL+QrFgdbBe2oG1pkB9yKuLdW3aVT+Irzz+27W6bYVXnuBViPy3Py8CrhID0Rdkn3SDUckPpXMW0czrtjlKAVZC3sfEUpkHvW3KwLbQASby2TQ0m11UH71ZrXF0pwy8+1beiJoWpyiLWNQGnMvSRvuipUQIRLIhO1C+PQUG9kHHkN+Ven6d4G8DanL5dn46tyzcBTgE/pW0/7OHiPVZidA1uC7jAzgNyR+VbRotjseKG/I6wn8qhfU4xjcNv1r0C5+BvxQtLgxPocksUZO6TecYHfrXGX3hq0srhrTU4ZLeZOqgknP4mpdMRhySwzNuOST09KFT0pZtMghf/AEZ2K/7VQ4mXhTWLnbQC4o8sBhz7V6R4V+IXhTw/bAar4cGoT8gsUzkE/wC6a8uVbpuhFWRb3TDlquEgPZ5vHHwE1tZP7b8OXli+PlMZIGc+yU1/DXwU8QwxXWj+Jm0PzPlKTt8wH0JWvGGs58cjd9Rn+dUJ9JS6UpLApPrtHFWn3A9l1b4Z6Dp8DjRfH1jdoRkbyhk+n+szXlay2cF1cWHmG4aL7so+6x9qgtNJs4IwBbjcP4qvR2MSnKjFDtfQYqztGc04XnGTgU5oAcBqhk04yN8vSqUrFNln7SCv3gamgd+SGIBqODS0QZfJq2sKx8KeK1jXZD1IvtUsR4O761I11JONrxoc+q1C6fOSRUchKKdvU1X1kVg8toRtijRV9AMCmszHrVTz5Y2VHyc0x70BtvlOfcDis3WuLlLrNxQku1oyOsZ3D6iqJlJHNQtK4Py04V7C5Dg/EnifQtS1LU9RvrzU7XV7cCNRHI6ggYPygDpXnKeJtVn1D7V4S06+OpzxIbi8uWYo5BJOcgZP417NeQXcrtIIYWJ/iZRu/lWabbXiPLjjUof7gx/IV6lLH2KPRfg94h17T9esNW1mZIrlGAbLADGev6V+jus+J/h3H4V1NtX8Rh3vbVg0ayjg44G3PrX5RWNzc+Hbka3qGmS6hDa8tboTuk+nIrG8U/ETU9Z8S6T4k0vwbeQ6Zagq9uxOWOGxkbsHrXvYfFU5R95jczqdLgNvZLIJgYklk24PLA4xxWwk7S5fBAo8P/EqGW+S48WeDJ4dGdf3saKAwY91IYH9ah1G/ttU1eS48PaPNpukH/V+axLH8ya8nHqm9UyESGUDrSx3BByDg1B9nZsZFNFtIvQZr56T1LNJXVm8z+I96dJeCHGTzVNI5gMYpraZJe8SMU28g0J3AttrU0EbER5ODiq6eKJEiUSwnd3wKsxaWY12yOXxWklhCFxsB/ChsDmJfFkC5PlOW9ME0yy8XvPJ5RgKe7rx+tdC9jDv/wBWB+FONjCgzsB/AUuZgVv7bRyBwD7CpTezSDGeDT0tFkbKxgY9qc9nIo+UZNHMNMptHPg+WMimxrJ/F1rRhF5GhQpmm/Z5y2SlFx8xX8sSfKwqJtHWQ5DYrTS3kzyuKuxoRxUctw5jn/7DVed5p3lTWwZIT14OehFdIFHegwQty1L2aWoOZzkdzfW6bQUC+gFSi/lkUo0aNn1Xn861HtbduMU/yIVXhM1Mqlio6nOiNi+0blz6GkfSbi4GGlYj35roN0a87OlW4L63QYZAa0i2M4//AIRe1kGLmJJB7rmp4PDGnWit9kH2cv12fLmurkuYpDhFwKrOy9cVTuuoEFlqfibRtp03xFfWgToqTMB+hrsbf4wfETTW8qPXJ7j5Ry8hb+vWuJeR5AUiQMfes2WWa3PzQLk+9dNGpJdSGz//0+YuIJnO5lwaiVUjG1xyfSuteAsDvFZlxaHHAr88aMDOjLbfkfaKlMshGM7sVUQ2UTFboSsO4TP9K1bb+z1/eQBxH/006/rSAznlII+Uk06N3l/hKiuhdbIRrJEQxPNUZZTIoG0Ae1MEiqIGIyDQ9ozAkSqmPWtCCSMoefm9Pp1pklkkp3lPMA6jOKyfkOxzUhihcLKTNnslWY2RSGihKH3rSka1sebKDDufm3cgfSq0l4zt93FVFscUIZJyPu8VbtHdXGTgVR+0N0NSeYcZHWod7mhv2smnTCQ36lijYWugi1vS4o1YxDeOAPavNxK+WAPBNOxMW45NVFybskTJ6Ho73sV2N8MIT3ArW0yC6vNSsdHtA8txfuEVB0Ge9eVPeatBFtgGz0LcA19AfAG5v9S+MWgWur+RHFEA5PHPT9Oa97B4ZtrQxPubwN+y34S02zhvPEbG7vCAzKCNoyOh4rS+If7N/gXW9BnTRoBp1/DGzQOnQuBxn8a9hurzUHuJpoJI0tY1A3bwK878R/E/wl4VsprnX9ZVBGCwUsCeOoGTX0/1ePKU4+R+X0+j3mltcWuprJHcWkrRuzoyq2DgEEiojp0vDeZ1r7C+JXx1+CviXwM8NvaDULycEL5aDzA/ODkZNfEFnqP2eM/apsscu2Twg9B7V89j4qL91mfK0aF3pDyqYmfYrDDbeMis/wDsPToolSFGR153KSCfrWimoafOoYXaMrDIORUyXNm5xFMrn2IrzliJIOUm0rUvEWkTGfSNRngcrsHzcAe1dn4c+KXxM8MSuZtRW/jYlsXI3/yxXJKHHLKSPYVE8ibgj5GTwDXVGs7XZfKz2pP2jNUaMDxF4ftL4Kc5SM4x9CahuviR8B/GjLPrvhSSC66M0IC/zBrx4Qsx4OBUC6NGz7zJsHvTdVBZnslz8Pvgv4g06ZPC2uR6PdSKSgnB+Un1wBXNy/ADW5Yi3h7XrTVlVcsFODn8SK8zvPDGnT5klkH1HWorU/2IxTTL27td/BMLsg/HFYTafQDRvPg/8RNPdjcaWsiA4yrq/wCOFauK1Pwt4g04O93pkqhOpSJz/Q17FoniTxbpbC8sNbmnCgfJM5cH8zXo1n8evGVtcRR6np9ld2y8NmJSxH5c1l7GLA+Tra0QonmI0LEdHUqf1Fb1vahcBJA34ivrOb4tfDPxVGIfF/hFUdT/AKy2iCE/UqtOj8J/s4eJIW+xS3WhydS8jkZ9gDitI4RdGFz5dit7hUOKvKJk6givqy4+AHhvULKE+D/GNrKzfdSQru/9DzXKan+z38T9LbEMMWpxdQYm3HH4Zro+qsTTPAhKM4bpTk+yiIW7W8cy5ydwPf6Gum1rwT4u0OaRNZ0WaAL1+U4/DiuYjjjZzGEeFx13KRis5Yd2BB9j0lZPNisIon/vLkf1q/ZX+r6czNpuqXNopOdiONv6gmnw2Duu5XDgU8WnqMVg4tDOltfHnxHskP2TxBLgjHzHPH5VzN1dajqV217rE5uLhur+tPeFUU9qpCQkkdqxk31ASQAnjmq4QDnbVs4B5pExXPLcBiAdlqXYx6LTiwx6U3ew4BrSkA4RygZC0fvOuD+VIs0inJbNTC+cZG3r14rUCAZbg8ZqwqDGDUBl3c4pUlPQ0kNE7x4Wudu7+9gu4oIomYP3FdDu3d6PsxJD7/u9KbHIgE1yEG+mrc7u9WJFyMHmoRHFFklaRIjOMgs1RO+73xUpudOHEqHP6VH9t01jsjPPoaAI/OYDhaY8pdeRxVksjcr0qnP8tRICuwpFXJ6UhfjioGnZDgVN2BrR2sci8jrV1LaVF2xYAFc7Jqd8se2BE+pFY+7UZZd0twyH0UnbSc2hnbzS3McZBIU+o61TGq3kK4MxI9wP8K55Gnj5kkL/AFNXLeeEg+eN1HtpdxGr/a3mECR92atszSKMn5ewrAf7AzAxryOtWBfEdq1VRsDQ8taeiKO1V4p2cZOMHtU4cAZJrJ3uBKVXGQKRcg0JIpFPLDGRWsWwJAPWpVkwMVTEhNO+ZunNJsC1w3NSpGknBODWdllPzHFWFe3C5kk2n60lIDVS0CDOaftUHpVCHULX7vmhj9asfbLY8+YB+NO4FsFR2qQNF3FUPNRxmNg30p657iqTAsySQAdKpOU6rVG+LyACLhgaQSBIwsh/eelO4FgyAdqrSStikEhbgVnXM94gZRbsV7Ng4NTNikaiSgjqKJLiJVw7FTWQsklvCDNHgn35q5FNA65fBJ9a5xxkRNOCCc9KiiliLZZgKsMIX+lSfYNKkUNNLtbuK6EhpjomWQZjO4CnPkjB4qhNFbQ/8gwu7e5IFUo31kSfvguyiZZopZx3TEu+3FV7rS8kCOTHvUyRCVgGcqf9njmqVxbal5hCTpt7DNRGbJkf/9RBdu7DdVkXNmv+ucVV+wXFH9i2tw4a+IXb0zX5/ZmGhYu7jR1jQwKVdhkk4x+FZtuCHN3GFnQgjYehzWhLovhgDEzb93AwaZb2eh2BECoZEByOakDHlNzu5i2Z6AU3ZeY+W3dvwFdU99p0X/HvCFP1Bpi6sTyBiq5Aucw008YIlj8s+h61Ys7aS7UsLoRY7H/9VdA2owS8Sxox9WFKJtNZSJUiBPpWagBjjQZHyxulYD3FVbi0tooxGLhGfnml1Cw0knfHG85PURmltdGgkQPFaGH3c5NCRcDIW1uHbhM+9WTEY87sKPWt5NHu1P8ArDtq/wCHPCNjqOv/APFR3v2bTRyW78dT3rsw+GcmNnDosZZijglRnHc1dhluftkdtp1u91JMwSIKudzHsK+wvDvwF+E3imzvtY8P6pJLY2gCzko2ZDjlB8vOcdq9n0q38A/CnR9Ke40pP7aux5WkWATdKoJIDuBkjnJJOBivqcuylXvYhnhej/s7eIbzRrLWviBqlv4dhl27IHGZSxxgY2nrVnWP2d9K8MXj+Jdf8U/8It4fVAkTs2LiaZhkMnBIHB4yK+hPE+qab8JtAm+KvxrvE1DX8O1lZA/KpxmONE5JIJAzXn3wt8Kat8V/tPx8/aGCxaVHubTdKmGIreEH5XYEn5iBn8a+hjg4xjzf18iWj43l1z4x+DtSl0rV7zUNW8G3rH7JqY4AUdA+MHt6d65DUrm+vtalup7zzY1j2xrM5YMCOuOea/XnxvrOgeIvgPrmseD1t7S1S1kMDyrmNdo69j9Pevxc8HfDjUZ4NL8ZavqElxBqqM+G6bwATj25rysZdXZ3Q+EnluJI5wsRCKBztHf2rc0a+ttOuZZdRtXvYpFxsH69xW3J4StS7sM1Wbw8ImxHKygV8ji6jvqc9Q9Q0Dx18GmeCyv/AApdwRBQrSDkA9z/AKyvU7Pwr+zp4y3RaHqsmk3PX5j39DkmvmI2c6LtMob6iolt5ITvXAJ7jisYVI9TJSPq+f4FReQ8mi+LreaJFLIGI3H/AMdr598X39/4Dul0+5njv7h+eAMD8QBXJFbiYOguJYtwxuRsGof7AiKp58rTkD7znLH61pJp7B7RGxb+ItQ1Zd0my04/OrBLOMSXW76Gsg+HIpR/rinsKoyeGJgdsUzgDknPX2HvSexPMddETt2RtvFV7hrtCJZItsJON1ctZltO8yGV5d4zs9Px4qWbVb512OWkQdBXPzBc662vLILlpmB9B0q8uoWhOBJn6159HqckYx9k3fUGpk1iUHizA+oNUqgXPTLe8tRyZVrWj1fR0G2fZJ9c15J/alzJgGBFHsDn+dAKzPufg/pTddoLnrI8RWsDEWkphRuvlsc/ge1bFt8R/GOnSrNousTJjp5jkjH45rx+HevyjBHrWgrsBjNXTxcgbPp/Sf2iPiFCIodYgs9ShGNxZQXI/Fa7O7+PfgzUYFg17wjE8b8SGFAH+owRXx3HfmMYJ5q7DqnVc8tXdDH9x3Ppxr39nfxXOtvJbXGjMxxl2KgZ+jmnS/BfwlqDmHwV42gRTysUnzYJ9SVJr5ra9hdFWSFZCO7DNQxTeVL5sC+Sf9nIqnjofyge/X/7Ofjy1xNp88eso3RkYAH+VcNqvwx+I2isw1Hw/KkQ/jXBH8647T9c8QaXMJrLXbyJAciMSDYPwxXp1l+0J8RNGi8m3u0uV6Yl5P8AMVPtacugHk8qQwO0N5DPFLGeRsPFSCOIwmRCR6A8Gvc7X9pDXRmTW9DsbiMj5sREsfXndWefiJ8LfFM5l8ReHJrXd1eDCL+oNT9VhLZhc8SgjeUyb2EYQZG7+L2FQkuM7hxXvV/4b+EutWbt4f8AEY0iXstwwbr9AK52D4C63qU/l6J4vtLxSoYFuM55xywo+qJCPKwcjNIzxrnNdlqXwW+Mekyt/wAS5LyFejxyJgj8zXIXOgeI7CRotS0u4ilTr8hYfmBWFSk0BGHUjK1FJLt4qlNeC2PlSxSI3+1Gw/mKjnU7QTIAT2JrlaaGaH2napINNj1IAkFqzVs7x03Iu8HsO9UpLKZDhrZ4j6moTYG+dVIH7td1Ni1WcyBZIvlrLhgkK9CuParKW5XlmzV3A0ZFjnl3jGDUiWtsT+8UVlkMDtB4qaMuvFOwGjtVTtT7oqpcjelTq3FRycjpUSAztuOKnjhjYgtSEc9KkTI5qAFe3XHyiozAeoTNaUY3rgRtn17U8Wdwx+VttKUWBhvaSyHhcCmjT39K6ZLCVCC8mcVY8mlysZya6ewyQKmWwfsK6QxY7UgGO1NRYHFtFrNtcPL5e6BTgDuR61eKz3C5SQR/7J61vS3bK+zyWYeoqERWrtvMBDHrW1hGdbwzwqfNcOT0IqX5x1NX/JQgBF20PZsy8GiwFFXx1NSbVkHDkH2pJ9P3p5Z6etFrYGEfNk46UmgIGtzGd4dmPvVGW/u1GxYlYe9bxj9ab5aelTygcx59xJxJGEz3WnzWkaRiR5c7u2Tmuk8tPSobiGGdQjIox3xRygcz9rubUBbYk1E2tav5iwiN9zdK3vslvH838S8jiqMhuJpfNYYccClysCxEPEwQOIgxI3ZPoKhbXnxtmhHmL1xTfI1iXIjnYKe2e1Ktm8AxMm5h6dadmMmj1d+vlkE9Ksy32oXirEfkiFZ8lvJKQUUqB61akupIrRoEB3HvRZktFxdIt7lNz3WCOxNUZbXRrf5Z7tlYVz00cjjkspJycVTkdy2wg8VMloOKOp/tPT48KkwZRwM1G+oW83+rfNc19jWTkrmrdtaqp+VcU4MaOhiK4yXI+lXPMYjAkPFZihioWPlqasGos+MhVq6j0LLrybDndzUbT578002knVpNxFC27EnFZIZ//9XNGqXNqNqtu9zyaX+1RMQ12RsHWsUMXYbqvxWUEv3wcV8AtXY5y19q0p5BHGu8t0we9ddYfDzxzqsaXGl+H3uYpBlTvYZH/fJriZbGCOM7AVx/Su407xl4m0Y2h06/kiCAALnI7V1QpJgYGveFfGegHOraBNYADOfmcY+pArlBf3UWGaIqDyCRxX2NoPxd8Y3Dw299JBdxsACssKtn+tfT/hfwj4Q8e2Ct4g0S0YleTErJ/wCzV0LBoD8omivb9POWVEB7A4pi6BfNzJICD6Gv0h+I3wc+Hujo39m6YINkZIwzdce9fDM8aJd3EK8LGxAH41hWwyirgcva2l1aKY7SQoT1PWtq1k1BFwT5jL3NaUUEZIroLWGNV3Ac1z0oalxM62+3eUZrwKIwM8dvrW74d8MX3iuO8TS1+1RQQvOWx8nyqTtz6nGKgliSYqj9GODivfPhboGnX9zH4PKtBp85+0SeU22R2HIUtz8vHQfnX1GX0ExM9q+HPibw/wCEPg0/jbU9CGg6Ho0Tu0E4xJcXEZIL5IBIJDYHPBqb4dWEFpY6l+0t8W3jW6vLZntIZcbbO1U5VUDcKxIPQDrVT4g2Nr4n+JPhP4YalHjw7bbJzbxkqJWTAAkJzkfMcjivmf8A4KY+J9a0/SvBvw80q5aw0fVL2GK4SD5GaPJG3PTHHpX1tCj8MV1/ILmV8Kx4g/bh+Nlx8TfFETQ+APCtwV02A58u52sdjEcDcNoz1r039q3402J+JHhX9njSpvsOjzMsurSov+rt0AATjHUMO9fQul2dh8Ff2Yje+ALWKzk0/TTNHuXcDII8hmxjJyK+GP2FlTxhYeKviz4uUa14j1K6mMk10A6oFcqqovG1QABioxOJs7paLRHo4PCqabZ6V+0X8c/Cep+GtA/Z2+Brw6hd+IpI7e5FttP2e1BzI52ZwcKfSuC13RvDvhiXS/h5oc7Xmm+FbbyhKeWaZgFcNyc7SvrUPxJtrDSv2iNA13S7OGzu5bWVWMSbQRtk7Vn3DmW/uZ35eSRyx9ea+axeIuhYmHs9igIyzFiMbv5VDPZocnFXMkHjtUzfMuTXzuIhc8p1nLQ5Se3HIxVdbHevSutjhjaT5hmrHloMgKMVyKmhXORisHUHYm6p100IRIQR7Vvn5T8vFQzyMFLdxWuwuUyDBzkjr7UgjPCg4A5/GrQvJXbawXH0qGSNZThsj6Vm6gyvJZxSNukAYnvUTW0MY/dRruHTNWwgt1KoSfrzVHeXOGqOYBn2a+k6Roo/CpotPTO25I3e1VpEA6Ej8aPtcqY4Bx60cwF4abYn5SRmrK+FY7ld0TbT71jyaxdQRMyKmR3I/wDr1xV/4h1iYbBctGGYH5MD/GlKQz0aXw7d2z7TIgA9Wpy2IjGHIJ+tcJp0915q753fIz8xzXUJvYbi5pRdgZde1hPJIFJHaRud6NgCqTyMDjOajmupYSqJwGq0yomzGrBtqkVaZJ408xiAPpXIzXEqjcpwaypL67WTf5hOOx6U72GegF0f75x9OKry21oeVQsfXNcZFqN1M2HYfhVkOzk7iT+JoA7COdkXaFxjpxVK4aaUFGkbaeq5OPyrlXhjD+Zg7h/tN/jWzYyNIp3HpTVRgDaXYync8CM3qQCa1bUXtrg2l1LBtxjY5XGPoahDEBiO1W4GJiDHrR7VibOkg+I/xD0vyxYatNKI/wCGWZiv5E12tj8dvipbhTeR6bdIf76I7Y/EV5WiKxJbmpREg6VSrMn2h7yPj9o1zZz2vi/wdBdiUAeZbQqGHHPIWs2LxT+z7r0QtbnQruylk/5aOzKFrxsIpBU9D1pjww7duwYNbxqvqWe62/g74V6p+60bxjFp4xhUdlLL9SXBpsvwO1B/3uheLbXXCekWFBGenIZq+fjZWsYMkcYVj3FT297fxRqLa7lgJPVGwa2STWqE2euat8EPi9p5LLoy3KAZzExb9AtebX+h+I9JkMOsaTNauvUFT2/Ctzw94t8U6RqIuINXuZWQEgSyFl4HpxX0V4O+MPi3Wo1j1VLS65xl4ATj65pexTGj49aWJMNIfLDdM8VZhCyH92d30r9NJfAHgj4gaXFJ4g0W3LtgloQ0Z/Rq828U/s//AA00q2mutMspbZ1BI2yk/wDoWabww2j4mW1mxkqQPXFRSRgHFb+raPFpWoPHbTylQSMMVI/kKypJVV9hiQ+5zn+dcs6XQRlvF3pY0Petm1iScDzBT7q2hiHyDFZ+yASB8RhQaesuGIPFU4R82KfcHAyKbQGgGVuAadsrMtmbcBWyoyM0uUCsyVDjHNaG0VVmAAOKTQEXmAHAqUgEdc5rJLHfjNOE8pby93y00wNQQ55FIwVeD2qt5rooKmqkk8hGSeaJSsBp7kYc4ppA61npI5HWpPMc4GahVB2JJF9qgVc1ZBJXmmxgbc1bEQ7KYYgTVpgCKgIzSQAI48ZIBpCkfYCnJ0NSgDNUBFH8p9KhkLl8oRn3qw/Ssd2YseelTJ2Qmy/5cjnLkc+lAtIzkkZNJZkkc81e9aIO40Y1xZFh8mBWd/Z+SfMXJ+ldR2pu0U2gOW+x7Wwoq3HZzNgMgC+w5rYaNN3StGKNPLBxWdhow4tPVCGxyKsm398VrlFqpMBg+1DZaViiYExxzTTCpORUgOaTcaTRHOf/2Q=="
        }
    };

    const EXTRA_KEY = 'tb-scouting-extra';
    const WN_PREFIX = '__TB_EXTRA__:';

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function readRawExtra() {
        if (window.TBShared && window.TBShared.loadExtra) {
            return window.TBShared.loadExtra();
        }
        if (window.__tbExtraMemory) return window.__tbExtraMemory;
        try {
            if (window.name && window.name.indexOf(WN_PREFIX) === 0) {
                const parsed = JSON.parse(window.name.slice(WN_PREFIX.length));
                if (parsed) {
                    window.__tbExtraMemory = parsed;
                    return parsed;
                }
            }
        } catch (e) {}
        try {
            const ls = JSON.parse(localStorage.getItem(EXTRA_KEY) || 'null');
            if (ls) {
                window.__tbExtraMemory = ls;
                return ls;
            }
        } catch (e) {}
        return null;
    }

    function getExtraData(publishedExtra) {
        const base = clone(DEFAULT_EXTRA);
        const saved = publishedExtra !== undefined ? publishedExtra : readRawExtra();
        if (!saved) return base;
        return {
            opponent: saved.opponent || base.opponent,
            pdfFileName: saved.pdfFileName || null,
            memberList: saved.memberList || base.memberList,
            cadence: saved.cadence || base.cadence,
            playDiagrams: Array.isArray(saved.playDiagrams) ? saved.playDiagrams : (base.playDiagrams || []),
            updatedAt: saved.updatedAt || null
        };
    }

    function saveExtraData(partial) {
        const current = getExtraData();
        const next = {
            opponent: partial.opponent !== undefined ? partial.opponent : current.opponent,
            pdfFileName: partial.pdfFileName !== undefined ? partial.pdfFileName : current.pdfFileName,
            memberList: partial.memberList !== undefined ? partial.memberList : current.memberList,
            cadence: partial.cadence !== undefined ? partial.cadence : current.cadence,
            playDiagrams: partial.playDiagrams !== undefined ? partial.playDiagrams : current.playDiagrams,
            updatedAt: new Date().toISOString()
        };
        window.__tbExtraMemory = next;
        try { window.name = WN_PREFIX + JSON.stringify(next); } catch (e) {}
        if (window.TBShared && window.TBShared.saveExtra) {
            window.TBShared.saveExtra(next);
        } else {
            try { localStorage.setItem(EXTRA_KEY, JSON.stringify(next)); } catch (e) {}
        }
        return next;
    }

    function resetExtraData() {
        window.__tbExtraMemory = null;
        try { if (window.name && window.name.indexOf(WN_PREFIX) === 0) window.name = ''; } catch (e) {}
        if (window.TBShared && window.TBShared.saveExtra) {
            window.TBShared.saveExtra(null);
        } else {
            try { localStorage.removeItem(EXTRA_KEY); } catch (e) {}
        }
        return clone(DEFAULT_EXTRA);
    }

    // PDFバイナリから埋め込みJPEG画像（DCTDecode）を抽出する
    function extractJpegsFromPdfBuffer(arrayBuffer) {
        const bytes = new Uint8Array(arrayBuffer);
        const text = new TextDecoder('latin1').decode(bytes);
        const jpegs = [];
        const re = /<<([\s\S]*?)>>\s*stream\r?\n/g;
        let m;
        while ((m = re.exec(text)) !== null) {
            const header = m[1];
            if (header.indexOf('/Image') !== -1 && header.indexOf('/DCTDecode') !== -1) {
                const start = m.index + m[0].length;
                const endIdx = text.indexOf('endstream', start);
                if (endIdx !== -1) {
                    let end = endIdx;
                    while (end > start && (bytes[end - 1] === 10 || bytes[end - 1] === 13)) end--;
                    const sub = bytes.subarray(start, end);
                    let bin = '';
                    for (let i = 0; i < sub.length; i += 0x8000) {
                        bin += String.fromCharCode.apply(null, sub.subarray(i, i + 0x8000));
                    }
                    const wMatch = header.match(/\/Width\s+(\d+)/);
                    const hMatch = header.match(/\/Height\s+(\d+)/);
                    jpegs.push({
                        width: wMatch ? parseInt(wMatch[1], 10) : 0,
                        height: hMatch ? parseInt(hMatch[1], 10) : 0,
                        size: sub.length,
                        dataUrl: 'data:image/jpeg;base64,' + btoa(bin)
                    });
                }
            }
        }
        return jpegs;
    }

    // PDF.js の読み込み（file:// で開いたときも Worker がブロックされないよう Blob URL 化）
    let pdfJsPromise = null;
    function loadPdfJs() {
        if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
        if (pdfJsPromise) return pdfJsPromise;
        pdfJsPromise = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            s.onload = async () => {
                const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                try {
                    const res = await fetch(workerUrl);
                    const code = await res.text();
                    const blob = new Blob([code], { type: 'application/javascript' });
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob);
                } catch (e) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
                }
                resolve(window.pdfjsLib);
            };
            s.onerror = () => reject(new Error('PDF.jsの読み込みに失敗しました'));
            document.head.appendChild(s);
        });
        return pdfJsPromise;
    }

    // ページ内のテキストアイテムを行・ブロック単位にまとめる
    function groupTextLines(items, pageHeight) {
        const raw = [];
        for (const it of items) {
            const str = String(it.str || '');
            if (!str.trim()) continue;
            const tx = it.transform[4];
            const ty = it.transform[5];
            const top = pageHeight - ty;
            const fontSize = Math.hypot(it.transform[0], it.transform[1]) || Math.abs(it.height) || 12;
            raw.push({ str, x: tx, top, width: it.width || (str.length * fontSize * 0.55), fontSize });
        }
        // Y座標がほぼ同じ（±3.5pt）かつ同じカード・行内でX座標が近接しているものだけを結合
        // ※隣のカードの背番号（約50pt離れている）が結合されないよう上限を16pt（大文字は10pt）に制限
        raw.sort((a, b) => (Math.abs(a.top - b.top) < 3.5 ? a.x - b.x : a.top - b.top));
        const merged = [];
        for (const r of raw) {
            const last = merged[merged.length - 1];
            const maxFont = last ? Math.max(last.fontSize, r.fontSize) : r.fontSize;
            const maxGap = maxFont >= 24 ? 10 : Math.min(maxFont * 0.85, 16);
            if (last && Math.abs(last.top - r.top) < 3.5 && (r.x - (last.x + last.width)) >= -4 && (r.x - (last.x + last.width)) < maxGap) {
                const gap = r.x - (last.x + last.width);
                if (gap > maxFont * 0.25 && !last.str.endsWith(' ') && !r.str.startsWith(' ')) {
                    last.str += ' ';
                }
                last.str += r.str;
                last.width = Math.max(last.width, (r.x + r.width) - last.x);
                last.fontSize = Math.max(last.fontSize, r.fontSize);
            } else {
                merged.push(Object.assign({}, r));
            }
        }
        return merged.map(m => ({
            text: m.str.trim(),
            x: m.x,
            centerX: m.x + m.width / 2,
            top: m.top,
            width: m.width,
            fontSize: m.fontSize
        })).filter(m => m.text);
    }

    // 1ページ分のトークン群からメンバーカード群を抽出する
    function extractCardsFromTokens(tokens, minTop, maxTop) {
        const areaTokens = tokens.filter(t => t.top >= minTop && t.top <= maxTop);
        // 背番号候補：1〜2桁の数字で、フォントサイズが大きめ（>=18）
        // ※右下のページ番号（x > 740 && top > 550）は除外
        const numTokens = areaTokens.filter(t => {
            if (t.x > 740 && t.top > 550) return false;
            return /^\d{1,2}$/.test(t.text) && t.fontSize >= 18;
        });

        // 背番号をY座標で行クラスタリング（差が45pt以内なら同じ段）
        numTokens.sort((a, b) => a.top - b.top);
        const rows = [];
        for (const nt of numTokens) {
            let placed = false;
            for (const row of rows) {
                const avgTop = row.reduce((s, x) => s + x.top, 0) / row.length;
                if (Math.abs(nt.top - avgTop) < 45) {
                    row.push(nt);
                    placed = true;
                    break;
                }
            }
            if (!placed) rows.push([nt]);
        }

        const cardRows = [];
        for (const row of rows) {
            row.sort((a, b) => a.centerX - b.centerX);
            const cards = [];
            for (let i = 0; i < row.length; i++) {
                const nt = row[i];
                const leftBound = i > 0 ? (row[i - 1].centerX + nt.centerX) / 2 : nt.centerX - 65;
                const rightBound = i < row.length - 1 ? (nt.centerX + row[i + 1].centerX) / 2 : nt.centerX + 65;

                // このカードのX範囲内にあるトークンを抽出（ポジションは背番号の約70pt上にあるため -85pt まで見る）
                const colTokens = areaTokens.filter(t =>
                    t !== nt &&
                    t.centerX >= leftBound &&
                    t.centerX <= rightBound &&
                    t.top >= nt.top - 85 &&
                    t.top <= nt.top + 95
                );

                // 背番号より上にあるトークン＝ポジション
                const above = colTokens.filter(t => t.top < nt.top - 8).sort((a, b) => b.top - a.top);
                const pos = above.length ? above[0].text : '';

                // 背番号より下にあるトークン＝名前、身長体重など
                const below = colTokens.filter(t => t.top > nt.top + 10).sort((a, b) => (Math.abs(a.top - b.top) < 5 ? a.x - b.x : a.top - b.top));
                // 同じ行（top差 < 5pt）は結合
                const belowLines = [];
                for (const bt of below) {
                    const last = belowLines[belowLines.length - 1];
                    if (last && Math.abs(last.top - bt.top) < 5) {
                        last.text += bt.text;
                    } else {
                        belowLines.push({ top: bt.top, text: bt.text });
                    }
                }

                let rawName = belowLines[0] ? belowLines[0].text : '';
                let meta = belowLines.slice(1).map(x => x.text).join(' ');
                let note = '';
                let alert = false;

                const noteMatch = rawName.match(/([(（].*?[)）])/);
                if (noteMatch) {
                    note = noteMatch[1];
                    rawName = rawName.replace(noteMatch[1], '').trim();
                    if (/怪我|欠場|注意|\?|？/.test(note)) alert = true;
                }

                cards.push({
                    pos: pos || '',
                    num: nt.text,
                    name: rawName,
                    note: note,
                    meta: meta,
                    alert: alert
                });
            }
            if (cards.length) cardRows.push(cards);
        }
        return cardRows;
    }

    // 図面周囲の余分な白余白を自動トリミングし、すべてのPDF図面の枠サイズを統一する
    function normalizeDiagramCanvas(srcCanvas, targetWidth = 680) {
        const sw = srcCanvas.width;
        const sh = srcCanvas.height;
        if (!sw || !sh) return srcCanvas;

        const ctx = srcCanvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, sw, sh).data;
        let minX = sw, maxX = 0, minY = sh, maxY = 0;

        for (let y = 0; y < sh; y++) {
            let dark = 0;
            const rowOff = y * sw * 4;
            for (let x = 0; x < sw; x += 2) {
                const i = rowOff + x * 4;
                if (imgData[i] < 215 || imgData[i + 1] < 215 || imgData[i + 2] < 215) {
                    dark++;
                    if (dark >= 3) break;
                }
            }
            if (dark >= 3) {
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }

        for (let x = 0; x < sw; x++) {
            let dark = 0;
            for (let y = minY; y <= maxY; y += 2) {
                const i = (y * sw + x) * 4;
                if (imgData[i] < 215 || imgData[i + 1] < 215 || imgData[i + 2] < 215) {
                    dark++;
                    if (dark >= 3) break;
                }
            }
            if (dark >= 3) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
            }
        }

        const bw = maxX - minX;
        const bh = maxY - minY;
        if (bw < sw * 0.2 || bh < sh * 0.2) {
            return srcCanvas;
        }

        // 下のPDF（標準サイズ）と同じ余白バランス（左右3.6%、上下2.8%）で統一
        const padX = Math.round(bw * 0.036);
        const padY = Math.round(bh * 0.028);
        const cropX = Math.max(0, minX - padX);
        const cropY = Math.max(0, minY - padY);
        const cropW = Math.min(sw - cropX, bw + padX * 2);
        const cropH = Math.min(sh - cropY, bh + padY * 2);

        const out = document.createElement('canvas');
        out.width = targetWidth;
        out.height = Math.round(targetWidth * (cropH / cropW));
        const octx = out.getContext('2d');
        octx.fillStyle = '#ffffff';
        octx.fillRect(0, 0, out.width, out.height);
        octx.drawImage(srcCanvas, cropX, cropY, cropW, cropH, 0, 0, out.width, out.height);
        return out;
    }

    // ページをCanvasで高品質・軽量なJPEG画像データURLにレンダリングする（余白自動トリミング＆サイズ統一付き）
    async function renderPageToJpeg(page, targetWidth = 680) {
        const unscaled = page.getViewport({ scale: 1 });
        // 余白が大きいPDFでもトリミング後にくっきり見えるよう少し高めの解像度で描画してから正規化
        const renderWidth = Math.max(targetWidth, 960);
        const scale = renderWidth / unscaled.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;
        const normalized = normalizeDiagramCanvas(canvas, targetWidth);
        return normalized.toDataURL('image/jpeg', 0.48);
    }

    // 既に取り込み済みの図面データの余白統一・軽量化を書き出し時に自動実行する
    async function compressExistingDiagrams(onProgress) {
        const current = getExtraData();
        const list = current.playDiagrams;
        if (!Array.isArray(list) || list.length === 0) return current;

        let changed = false;
        const nextList = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item && item.image && (!item.cropNormalized || item.image.length > 26000)) {
                if (typeof onProgress === 'function') onProgress(i + 1, list.length);
                try {
                    const compressed = await new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.naturalWidth || img.width || 680;
                            canvas.height = img.naturalHeight || img.height || 480;
                            const ctx = canvas.getContext('2d');
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            const normalized = normalizeDiagramCanvas(canvas, 680);
                            resolve(normalized.toDataURL('image/jpeg', 0.48));
                        };
                        img.onerror = () => resolve(item.image);
                        img.src = item.image;
                    });
                    if (compressed) {
                        nextList.push(Object.assign({}, item, { image: compressed, cropNormalized: true }));
                        changed = true;
                        continue;
                    }
                } catch (_) {}
            }
            nextList.push(item);
        }
        if (changed) {
            return saveExtraData({ playDiagrams: nextList });
        }
        return current;
    }

    // ページのトークンからPlay Diagramメタデータを抽出する
    function extractPlayDiagramMeta(tokens) {
        // 上部 (top <= 90) のトークンをX座標順に並べる
        const topTokens = tokens
            .filter(t => t.top <= 90)
            .sort((a, b) => a.x - b.x);

        const combinedTopText = topTokens.map(t => t.text).join(' ').replace(/\s+/g, ' ').trim();

        // スラッシュを2つ以上含み、かつ #数字 / vs / Down-Dist / 代表的な体型名を含むかチェック
        const slashCount = (combinedTopText.match(/\//g) || []).length;
        if (slashCount < 2 || !/#\d+|vs|[1-4]\s*[-–]\s*\d+|GUN|TRIP|TRIO|ACE|TWIN|FLEX|EMPTY|I\s*FORM|PRO|WING|BUNCH|STACK|SPREAD|PISTOL/i.test(combinedTopText)) {
            return null;
        }

        const rawParts = combinedTopText.split('/').map(s => s.trim());
        if (rawParts.length < 3) return null;

        let gamePlay = rawParts[0] || '';
        let downDist = rawParts[1] || '';
        let formation = rawParts[2] || '';
        let playName = rawParts.slice(3).join(' / ').trim() || '';

        if (rawParts.length === 3) {
            if (/^[1-4]\s*[-–]/.test(rawParts[1])) {
                downDist = rawParts[1];
                formation = rawParts[2];
                playName = '';
            } else {
                formation = rawParts[1];
                playName = rawParts[2];
                downDist = '';
            }
        }

        // 表記揺れの正規化（例: "3 STEP" -> "3STEP"）
        playName = playName.replace(/\b([1235])\s+STEP\b/gi, '$1STEP').replace(/\s+/g, ' ').trim();
        formation = formation.replace(/\s+/g, ' ').trim();

        const playNumMatch = gamePlay.match(/#(\d+)/);
        const playNum = playNumMatch ? parseInt(playNumMatch[1], 10) : 0;

        // 試合名（例: KG 260614 vs Kandai）
        const gameMatch = gamePlay.match(/^(.*?)(?:\s*#\d+.*)?$/);
        const gameName = gameMatch ? gameMatch[1].trim() : gamePlay;

        let down = '';
        let distance = '';
        const ddMatch = downDist.match(/^([1-4])\s*[-–/]\s*(\S+)/);
        if (ddMatch) {
            down = ddMatch[1];
            distance = ddMatch[2];
        }

        // 図面内の注記テキスト（タイトル以外で、PPやOLやShift、赤文字注記など）
        const noteTokens = tokens.filter(t => t.top > 85 && (
            t.top > 430 ||
            t.text.includes(':') ||
            /PP|OL|RG|LG|RT|LT|C\s*:|Slide|Man|Step|Fake|Pull|Shift|Kill|Flash|Motion|Trap|Boot|Naked|Screen|Pass|Lead/i.test(t.text)
        ));
        noteTokens.sort((a, b) => (Math.abs(a.top - b.top) < 6 ? a.x - b.x : a.top - b.top));
        const noteLines = [];
        for (const nt of noteTokens) {
            const last = noteLines[noteLines.length - 1];
            if (last && Math.abs(last.top - nt.top) < 6) {
                last.text += ' ' + nt.text;
            } else {
                noteLines.push({ top: nt.top, text: nt.text });
            }
        }
        const cleanNotes = noteLines
            .map(l => l.text.trim())
            .filter(t => t.length >= 3 && !/^[A-Z]{1,2}$/.test(t) && !/^\d+$/.test(t))
            .join(' / ');

        return {
            title: combinedTopText,
            gameName,
            gamePlay,
            playNum,
            downDist,
            down,
            distance,
            formation,
            playName,
            notes: cleanNotes
        };
    }

    async function importFromPdfFile(file, onProgress) {
        const buf = await file.arrayBuffer();
        const jpegs = extractJpegsFromPdfBuffer(buf.slice(0));
        const pdfjsLib = await loadPdfJs();
        const pdf = await pdfjsLib.getDocument({
            data: new Uint8Array(buf),
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/'
        }).promise;

        const result = {};
        const playDiagrams = [];

        for (let p = 1; p <= pdf.numPages; p++) {
            if (typeof onProgress === 'function') {
                onProgress(p, pdf.numPages);
            }
            const page = await pdf.getPage(p);
            const viewport = page.getViewport({ scale: 1 });
            const tc = await page.getTextContent();
            const tokens = groupTextLines(tc.items, viewport.height);
            const fullText = tokens.map(t => t.text).join(' ');

            // 1. 表紙（例：20261015 / Fighters）
            if (p === 1 && tokens.length <= 6) {
                const titleTok = tokens.find(t => t.fontSize >= 20 && !/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(t.text));
                if (titleTok) result.opponent = titleTok.text;
            }

            // 2. OFF Member List ページ（3段目の身長体重 top=535.4 も入るように 565 まで取得）
            if (/OFF\s*Member\s*List/i.test(fullText)) {
                const offRows = extractCardsFromTokens(tokens, 55, 565);
                if (offRows.length) {
                    result.memberList = result.memberList || clone(getExtraData().memberList);
                    result.memberList.offRows = offRows;
                }
            }

            // 3. 4th Down Member List ページ
            if (/4\s*th\s*Down\s*Member|FG\s*Member|PC\s*Member/i.test(fullText)) {
                const pcTok = tokens.find(t => /PC\s*Member/i.test(t.text));
                const splitTop = pcTok ? pcTok.top : 310;
                const fgRows = extractCardsFromTokens(tokens, 80, splitTop - 5);
                const pcRows = extractCardsFromTokens(tokens, splitTop + 5, 565);
                result.memberList = result.memberList || clone(getExtraData().memberList);
                if (fgRows.length) result.memberList.fgMembers = fgRows.reduce((a, b) => a.concat(b), []);
                if (pcRows.length) result.memberList.pcMembers = pcRows.reduce((a, b) => a.concat(b), []);
            }

            // 4. Cadence 詳細ページ（見出しだけでなく本文があるページ）
            if (/Cadence/i.test(fullText) && tokens.length >= 6) {
                // ヘッダー（top < 65）とフッター（top > 560）を除外
                const bodyTokens = tokens.filter(t => t.top >= 65 && t.top <= 560);
                // Y座標順に並べる
                bodyTokens.sort((a, b) => (Math.abs(a.top - b.top) < 5 ? a.x - b.x : a.top - b.top));
                const lines = [];
                for (const bt of bodyTokens) {
                    const last = lines[lines.length - 1];
                    if (last && Math.abs(last.top - bt.top) < 5) {
                        last.text += bt.text;
                        last.fontSize = Math.max(last.fontSize, bt.fontSize);
                    } else {
                        lines.push({ top: bt.top, text: bt.text, fontSize: bt.fontSize });
                    }
                }
                if (lines.length >= 2) {
                    const headline = lines[0].text;
                    const items = [];
                    let cur = null;
                    let prevTop = lines[0].top;
                    for (let i = 1; i < lines.length; i++) {
                        const ln = lines[i];
                        if (/^[■◼▪●・]/.test(ln.text)) {
                            cur = { heading: ln.text, bodyLines: [] };
                            items.push(cur);
                        } else {
                            if (!cur) {
                                cur = { heading: '■概要', bodyLines: [] };
                                items.push(cur);
                            }
                            if (cur.bodyLines.length > 0 && (ln.top - prevTop) > 26) {
                                cur.bodyLines.push('');
                            }
                            // カギカッコ内の英単語（Hut等）を青字、N回を赤字に自動装飾
                            const decorated = ln.text
                                .replace(/「([A-Za-z0-9\s]+)」/g, '「{blue:$1}」')
                                .replace(/(\d+回)/g, '{red:$1}');
                            cur.bodyLines.push(decorated);
                        }
                        prevTop = ln.top;
                    }
                    result.cadence = {
                        pageTitle: 'Cadence',
                        headline: headline,
                        items: items.map(it => ({ heading: it.heading, body: it.bodyLines.join('\n') })),
                        image: (getExtraData().cadence || {}).image || ''
                    };
                }
            }

            // 5. Play Diagram（プレー図面）ページ
            const pdMeta = extractPlayDiagramMeta(tokens);
            if (pdMeta) {
                const image = await renderPageToJpeg(page, 680);
                playDiagrams.push({
                    page: p,
                    sourcePdf: file.name,
                    ...pdMeta,
                    image,
                    cropNormalized: true
                });
            }
        }

        // Cadence用の埋め込み写真（横長で最も大きいJPEG）があればセット
        const fieldPhotos = jpegs.filter(j => j.width > 300 && j.width > j.height * 1.15);
        if (fieldPhotos.length) {
            const best = fieldPhotos[fieldPhotos.length - 1];
            result.cadence = result.cadence || clone(getExtraData().cadence);
            result.cadence.image = best.dataUrl;
        }

        if (playDiagrams.length > 0) {
            // 同一PDF内の試合名表記揺れ（例: vs Kandai と vs Kansai のタイポ）を最頻値の試合名に統一
            const gameFreq = {};
            for (const pd of playDiagrams) {
                if (pd.gameName) gameFreq[pd.gameName] = (gameFreq[pd.gameName] || 0) + 1;
            }
            let dominantGame = '';
            let maxCount = 0;
            for (const g of Object.keys(gameFreq)) {
                if (gameFreq[g] > maxCount) {
                    maxCount = gameFreq[g];
                    dominantGame = g;
                }
            }
            if (dominantGame && maxCount >= playDiagrams.length * 0.5) {
                for (const pd of playDiagrams) {
                    pd.gameName = dominantGame;
                }
            }

            const existing = (getExtraData().playDiagrams || []);
            // 同じPDFファイル（または同じ試合名）の再取り込みなら入れ替え、別試合ならそのまま順番に追加
            const filteredExisting = existing.filter(m => {
                if (m.sourcePdf && m.sourcePdf === file.name) return false;
                if (!m.sourcePdf && dominantGame && m.gameName === dominantGame) return false;
                return true;
            });
            result.playDiagrams = filteredExisting.concat(playDiagrams);
        }

        if (result.memberList || result.cadence || (result.playDiagrams && result.playDiagrams.length)) {
            result.pdfFileName = file.name;
            return saveExtraData(result);
        }
        throw new Error('PDF内に Member List, Cadence, または Play Diagram のページが見つかりませんでした。');
    }

    // テキスト内の {blue:...} と {red:...} をHTMLに変換
    function formatRichText(str) {
        const esc = String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return esc
            .replace(/\{blue:([\s\S]*?)\}/g, '<span class="txt-blue">$1</span>')
            .replace(/\{red:([\s\S]*?)\}/g, '<span class="txt-red">$1</span>')
            .replace(/\n/g, '<br>');
    }

    window.TBScoutingExtra = {
        DEFAULT_EXTRA,
        getExtraData,
        saveExtraData,
        resetExtraData,
        importFromPdfFile,
        compressExistingDiagrams,
        formatRichText
    };
})();
