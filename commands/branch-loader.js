async function checkoutRemoteBranches(git) {
  const branches = await git.branch();

  for (const branch of branches.all) {
    if (branch == branches.current) {
      continue;
    }

    const match = branch.match(/^remotes\/([^\/]+)\/(.+)$/);

    if (match && match[2] !== branches.current) {
      console.log(' |> Remote', match[1] + '/' + match[2], '->', match[2]);
      await git.branch(match[1] + '/' + match[2], match[2], {
        '--track': true,
      });

      await git.checkout(match[2]);
    }
  }
}

module.exports = checkoutRemoteBranches;
