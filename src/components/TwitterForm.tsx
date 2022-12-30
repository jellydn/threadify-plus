import { A } from "solid-start";
import { createRouteAction } from "solid-start/data";
import { getTweetByUrl } from "~/api-client";
import logger from "~/logger";

export function TwiterForm() {
  const [data, { Form }] = createRouteAction(async (formData: FormData) => {
    const url = formData.get("url");
    if (!url) {
      throw new Error("Invalid url");
    }
    const { id, ...tweet } = await getTweetByUrl(url.toString());
    logger.info(tweet);
    // TODO: navigate to thread page with redirect()
    // TODO: show toast message
    window.location.href = `/thread/${id}`;
  });

  return (
    <Form class="mx-auto max-w-lg h-96">
      {data.error && (
        <div class="shadow-lg alert alert-error">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="flex-shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! {JSON.stringify(data.error)}.</span>
          </div>
        </div>
      )}
      <div class="flex p-4 mx-auto form-control">
        <label for="url" class="label">
          <span class="label-text">Enter Twitter URL or ID</span>
          <div
            class="tooltip"
            data-tip="https://twitter.com/{USER}/status/{ID}"
          >
            <span class="badge">Example</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="Twitter URL or ID"
          class="w-full input input-bordered"
          name="url"
          required
        />
        <input
          disabled={data.pending}
          class={
            data.pending
              ? "mt-4 btn btn-primary loading"
              : "mt-4 btn btn-primary"
          }
          type="submit"
          value="submit"
        />
        {data.pending && <progress class="mt-2 w-56 progress"></progress>}

        <div class="divider">Or take a try with below</div>
        <div class="flex justify-start items-center mt-4">
          <div class="avatar">
            <div class="p-1 w-16 h-16 mask mask-squircle bg-base-100">
              <A href="/thread/1605322303319199744" target="_blank">
                <img
                  src="https://pbs.twimg.com/profile_images/1579200056090951680/j3-H7soT_200x200.jpg"
                  alt="Steve (Builder.io)"
                  class="mask mask-squircle"
                />
              </A>
            </div>
          </div>
          <div class="avatar">
            <div class="p-1 w-16 h-16 mask mask-squircle bg-base-100">
              <A href="/thread/1607652286981083136" target="_blank">
                <img
                  src="https://pbs.twimg.com/profile_images/1573897372408901637/Q8g6SXFM_200x200.jpg"
                  alt="Chris Staudinger"
                  class="mask mask-squircle"
                />
              </A>
            </div>
          </div>
          <div class="avatar">
            <div class="p-1 w-16 h-16 mask mask-squircle bg-base-100">
              <A href="/thread/1595455606743105536" target="_blank">
                <img
                  src="https://pbs.twimg.com/profile_images/1512819600324448257/exWNgG2i_200x200.jpg"
                  alt="Bytebytego"
                  class="mask mask-squircle"
                />
              </A>
            </div>
          </div>
          <div class="avatar">
            <div class="p-1 w-16 h-16 mask mask-squircle bg-base-100">
              <A href="/thread/1607488421685231617" target="_blank">
                <img
                  src="https://pbs.twimg.com/profile_images/1027023337497800704/4rtouf4R_200x200.jpg"
                  alt="goodside"
                  class="mask mask-squircle"
                />
              </A>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
